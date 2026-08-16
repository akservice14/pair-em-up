// AppController.js
import './style.css';
import { AppModel } from './AppModel.js';
import { AppView } from './AppView.js';
import { StorageService } from './StorageService.js';
import { GameController } from './GameModelController/GameController.js';
import { AudioService } from './AudioService.js'
import * as c from './config.js';

class AppController {
  constructor() {
    this.storageService = new StorageService();
    // this.storageService.clearStorage();
    this.audioService = new AudioService();
    this.modelCallbacks = {
      onModelChange: this.onModelChange,
    };
    const initialData = this.storageService.getObject('app') || {};

    const gameData = this.storageService.getObject('autoSaved') || {};
    const userData = this.storageService.getObject('userSaved') || {};
    Object.entries(gameData).forEach((entry) => console.log(entry));
    Object.entries(userData).forEach((entry) => console.log(entry));

    this.model = new AppModel(initialData, this.modelCallbacks);
    this.viewCallbacks = {
      onSwitchTheme: this.onSwitchTheme,
      onSwitchAudio: this.onSwitchAudio,
      onClickContinue: this.onClickContinue,
      onShowHistory: this.onShowHistory,
      onClickGameMode: this.onClickGameMode,
      onChangeThemeMode: this.onChangeThemeMode,
      onChangeAudio: this.onChangeAudio,
      onClickResetConf: this.onClickResetConf,
    };
    const settingsData = {
      isDark: this.model.isDarkTheme,
      isAudioOn: this.model.isAudioEffectsOn(),
    };
    this.view = new AppView(this.viewCallbacks, settingsData);
    if (
      this.storageService.getObject('userSaved') != null ||
      this.storageService.getObject('autoSaved') != null
    )
      this.view.showBtnContinue(true);
    this.view.setDarkTheme(this.model.isDarkTheme);
    this.breakGameParams = null;
  }

  continueStoredGame() {
    this.view.recreateGameView();
    let storedGame = this.storageService.getObject('userSaved');
    let storedType = null;
    if (!storedGame) storedGame = this.storageService.getObject('autoSaved');
    else  storedType = 'user';
    if (storedGame) this.startGame(null, storedGame, storedType);
  }

  restartGame(reason, mode) {
    this.storageService.clearGame();
    this.view.recreateGameView();
    this.gameController = null;
    if (reason === 'continue') {
      let storedGame = this.storageService.getObject('userSaved');
      this.startGame(null, storedGame, 'user');
    } else if (reason === 'reset') {
      this.startGame(mode, null, 'user');
    }
  }

  startGame(mode, storedGame, storedType) {
    const callbacks = {
      onModelChange: this.onModelChange,
      onFinish: this.onFinish,
      onGameBreak: this.onGameBreak,
      onPlaySound: this.onPlaySound,
    };
    const gameView = this.view.getGameView();
    this.gameController = new GameController(
      mode,
      storedGame,
      gameView,
      callbacks,
    );
    if (storedType === 'user') this.gameController.setModelHasUserSaved();
    // UI
    this.view.showStartView(false);
    this.view.showGameView(true);
    this.onPlaySound(c.AUDIO_EVENT.START);
  }

  finishGame(data) {
    const history = this.model.getLastFiveResults();
    const finishInfo = {
      outcome: data.outcome,
      msg: data.msg,
      score: data.finalScore,
      time: data.completionTime,
    };
    const resultObj = {
      date: data.date,
      gameMode: data.gameMode,
      finalScore: data.finalScore,
      outcome: data.outcome,
      completionTime: data.completionTime,
      numberOfMovesMade: data.numberOfMovesMade,
    };
    const audioEvent = data.outcome === 'win' ? c.AUDIO_EVENT.WIN : c.AUDIO_EVENT.LOSE;
    // UI
    this.onPlaySound(audioEvent);
    this.view.showGameView(false);
    this.view.showFinishView(true);
    this.view.renderFinishView(finishInfo, history);
    // model - current game is included in history after showing on finish view
    this.model.storeGameResult(resultObj);
    // storage - clear current game data
    this.storageService.clearGame();
  }

  // Model and GameController shared callbacks
  onModelChange = (name, object) => {
    this.storageService.saveObject(name, object);
  };

  // Game Controller callbacks
  onFinish = (data) => {
    this.finishGame(data);
  };

  onGameBreak = (reason, mode) => {
    this.breakGameParams = { reason: reason, mode: mode };
    this.view.showResetConfModal();
  };

  // AppView Callbacks
  onClickContinue = () => {
    this.continueStoredGame();
  };

  onClickGameMode = (mode) => {
    this.startGame(mode, null);
  };

  onShowHistory = () => {
    return this.model.getLastFiveResults();
  };

  onChangeThemeMode = () => {
    this.model.toggleIsDarkTheme();
    this.view.setDarkTheme(this.model.isDarkTheme);
  };

  onChangeAudio = () => {
    this.model.toggleAudioEffectSettings();
    this.audioService.disableAudio(!this.model.isAudioEffectsOn());
  };

  onClickResetConf = (value) => {
    if (value) {
      this.gameController.dispose();
      const { reason: reason, mode: mode } = this.breakGameParams;
      this.restartGame(reason, mode);
    }
    this.breakGameParams = null;
  };

  onPlaySound = (soundEvent) => {
    this.audioService.playSound(soundEvent);
  }
}

new AppController(); // for browser usage
export { AppController }; // for tests
