// GameController.js

import { GameModel } from './GameModel';
import { gameModelAPI } from './gameModelAPI.js';
import { gameViewAPI } from '../GameView/gameViewAPI.js';
import { CellCreator } from './CellCreator.js';
import { TimeService } from './TimeService.js';
import { BoardValueMutator } from './BoardValueMutator.js';
import { GameRules } from './GameRules.js';
import * as c from '../config.js';

// Callbacks
// onModelChange: this.callbacks.onModelChange,
// onFinish: this.callbacks.onFinish,
// onGameBreak: this.callbacks.onGameBreak,
// onPlaySound: this.callbacks.onPlaySound,

class GameController {
  constructor(mode, storedGame, gameView, callbacks) {
    this.callbacks = callbacks;
    this.cellControllers = [];
    this.gameRules = new GameRules();

    this._initModel(mode, storedGame);
    this._initView(gameView);
    this._initCellCreator();
    this._initBoardValueMutator(mode);
    this._initTimeService();
    this.renderCounters();
  }

  // constructor methods
  _initModel(mode, storedGame) {
    this.modelCallbacks = {
      onModelChange: this.onModelChange,
      onNewCellsAdded: this.onNewCellsAdded,
    };
    this.model = new GameModel(mode, storedGame, this.modelCallbacks);
    this.modelAPI = gameModelAPI(this.model);
  }

  _initView(gameView) {
    this.view = gameView;
    this.view.showMode(this.model.gameMode);
    this.viewCallbacks = {
      onClickReset: this.onClickReset,
      onClickSave: this.onClickSave,
      onClickContinue: this.onClickContinue,
      onClickHints: this.onClickHints,
      onClickRevert: this.onClickRevert,
      onClickAdd: this.onClickAdd,
      onClickShuffle: this.onClickShuffle,
      onClickEraser: this.onClickEraser,
      onPlaySound: this.callbacks.onPlaySound,
    };
    this.view.setCallbacks(this.viewCallbacks);
    this.viewAPI = gameViewAPI(this.view);
    this.view.showScore(this.model.score);
  }

  _initCellCreator() {
    this.cellCreatorCB = {
      onUpdateCellValues: this.onUpdateCellValues,
      appendCellController: this.appendCellController,
      getControllersArray: this.getControllersArray,
      onCellSelected: this.onCellSelected,
      onCellDeselected: this.onCellDeselected,
      onPlaySound: this.callbacks.onPlaySound,
    };
    this.cellCreator = new CellCreator(
      this.cellCreatorCB,
      this.modelAPI,
      this.viewAPI,
    );
  }

  _initBoardValueMutator(mode) {
    this.boardValueMutatorCB = {
      checkWinLoseConditions: this.checkWinLoseConditionsCB,
      renderCounters: this.renderCountersCB,
      updateAllCellValues: this.updateAllCellValuesCB,
      setValueInCell: this.setValueInCellCB,
      clearCellValueAndDeselect: this.clearCellValueAndDeselect,
      deselectCellOnly: this.deselectCellOnly,
    };
    this.boardValueMutator = new BoardValueMutator(
      this.boardValueMutatorCB,
      this.modelAPI,
      this.viewAPI,
    );
    mode
      ? this.boardValueMutator.setGameboard(this.model.gameMode)
      : this.cellCreator.createCells();
  }

  _initTimeService() {
    this.timerCB = { onUpdateTimer: this.onUpdateTimer };
    this.timeService = new TimeService(this.modelAPI, this.timerCB);
    this.timeService.startTimer();
  }

  // Other methods

  // Game flow
  recordMove() {
    const selectedPair = this.model.getSelectedPairCopy();
    const score = this.gameRules.validateMove(
      selectedPair,
      this.model.getGameBoardCopy(),
    );

    if (score) {
      this.model.updateScore(score);
      this.boardValueMutator.saveLastMove();
      this.model.clearSelectedPair();
      this.boardValueMutator.setNullInPair(selectedPair);
      this.model.incrementMoves();
      this.callbacks.onPlaySound(c.AUDIO_EVENT.SUCCESS);
      this.view.showScore(this.model.score);
      this.renderCounters();
    } else {
      this.model.clearSelectedPair();
      this.callbacks.onPlaySound(c.AUDIO_EVENT.FAIL);
    }
    selectedPair.forEach((coord) => {
      score && this.clearCellValueAndDeselect(coord);
      !score && this.deselectCellOnly(coord);
    });
    this.checkWinLoseConditions();
  }

  checkWinLoseConditions() {
    const outcome = this.gameRules.getOutcome(
      this.model.getGameBoardCopy(),
      this.model.getStatePrimitives().score,
      this.model.isAssistButtonsUsed(),
    );
    if (outcome) this.finalizeGame(outcome.outcome, outcome.msg);
  }

  finalizeGame(outcome, user_msg) {
    console.log(outcome);
    this.timeService.stopTimer();
    const time = this.timeService.convertElapsedTime(this.model.elapsedTime);
    const finalData = {
      msg: user_msg,
      date: this.timeService.formatDateTime(),
      gameMode: this.model.gameMode,
      finalScore: this.model.score,
      outcome: outcome,
      completionTime: time,
      numberOfMovesMade: this.model.numberMoves,
    };
    this.view.makeVisualEffectFinish(outcome);
    this.callbacks.onFinish(finalData);
  }

  // UI updates
  renderCounters() {
    const { hint, revert, addNumbers, shuffle, eraser } =
      this.model.assistButtonCounters;
    const hintLimited = hint > 5 ? '5+' : hint;
    const viewCounters = {
      hint: hintLimited,
      revert: revert,
      addNumbers: addNumbers,
      shuffle: shuffle,
      eraser: eraser,
    };
    this.view.showBtnCounters(viewCounters);
  }

  updateAllCellValues() {
    this.model.getGameBoardCopy().forEach((row, i) => {
      row.forEach((value, j) => {
        this.setValueInCell({ row: i, col: j }, value);
      });
    });
  }

  // only called for successful moves.
  clearCellValueAndDeselect = (coordinates) => {
    const cellController = this._findController(coordinates);
    if (!cellController) return;
    cellController.clearCell();
    cellController?.deselectCellAfterAssessment();
  };

  // only called for failed moves.
  deselectCellOnly = (coordinates) => {
    const cellController = this._findController(coordinates);
    if (!cellController) return;
    cellController?.deselectCellAfterAssessment();
  };

  // setter
  setValueInCell = (coordinates, value) => {
    const cellController = this._findController(coordinates);
    if (!cellController) return;
    if (value) cellController.showValue(value);
    else cellController.clearCell();
  };

  _findController(coordinates) {
    const { row, col } = coordinates;
    return this.cellControllers?.[row]?.[col];
  }

  // Other helpers
  setModelHasUserSaved() {
    this.model.setHasUserSaved();
    this.view.enableContinueBtn();
  }

  // Model callbacks
  onModelChange = (name, object) => {
    this.callbacks.onModelChange(name, object);
  };

  onNewCellsAdded = () => {
    this.cellCreator.createCells();
  };

  // View callbacks
  onClickHints = () => {
    const gameBoard = this.model.getGameBoardCopy();
    const hints = this.gameRules.getRemainingMoves(gameBoard);
    this.model.updateHints(hints);
    this.renderCounters();
  };

  onClickRevert = () => {
    this.boardValueMutator.handleRevert();
  };

  onClickAdd = () => {
    this.boardValueMutator.handleAdd();
  };

  onClickShuffle = () => {
    this.boardValueMutator.handleShuffle();
  };

  onClickEraser = () => {
    this.boardValueMutator.handleEraser();
  };

  onClickReset = () => {
    this.callbacks.onGameBreak('reset', this.model.gameMode);
  };

  onClickSave = () => {
    this.model.setHasUserSaved(true);
    this.model.saveByUser();
    this.view.enableContinueBtn();
  };

  onClickContinue = () => {
    this.callbacks.onGameBreak('continue', this.model.gameMode);
  };

  // CellCreator Callbacks
  appendCellController = (row, controller) => {
    if (!this.cellControllers[row]) {
      this.cellControllers[row] = [];
    }
    this.cellControllers[row].push(controller);
  };

  onUpdateCellValues = () => {
    this.updateAllCellValues();
  };

  getControllersArray = () => {
    return this.cellControllers;
  };

  // Cell controller callbacks
  onCellSelected = (coordinates) => {
    let res = this.model.addSelectedCell(coordinates);
    if (res) this.recordMove();
  };

  onCellDeselected = (coordinates) => {
    this.model.deleteUnselectedCell(coordinates);
  };

  // Timer callbacks
  onUpdateTimer = (time) => {
    this.view.showTimer(time);
  };

  // BoardValueMutatorCallbacks

  checkWinLoseConditionsCB = () => {
    this.checkWinLoseConditions();
  };

  renderCountersCB = () => {
    this.renderCounters();
  };

  updateAllCellValuesCB = () => {
    this.updateAllCellValues();
  };

  setValueInCellCB = (coordinates, value) => {
    this.setValueInCell(coordinates, value);
  };

  // cleanup
  dispose() {
    this.timeService?.stopTimer();
    this.cellControllers.forEach(row => row.forEach(c => c.dispose()));
    this.cellControllers = null;
    this.model.gameBoard = null;
  }
}

export { GameController };
