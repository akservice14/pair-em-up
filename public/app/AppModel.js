// AppModel.js
import * as c from './config.js';

class AppModel {
  constructor(initialData, callbacks) {
    this.callbacks = callbacks;
    const source = { ...c.APP_MODEL_DEFAULT, ...initialData };
    this.isDarkTheme = source.isDarkTheme;
    this.audioEffectSettings = { ...source.audioEffectSettings };
    this.history = [...source.history];
  }

  _persist() {
    this.callbacks.onModelChange('app', this);
  }

  toggleIsDarkTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this._persist();
  }

  toggleAudioEffectSettings() {
    for (let key in this.audioEffectSettings)
      this.audioEffectSettings[key] = !this.audioEffectSettings[key];
    this._persist();
  }

  storeGameResult(resultObj) {
    this.history.unshift(resultObj);
    if (this.history.length > 5) {
      this.history.pop();
    }
    this._persist();
  }

  getLastFiveResults() {
    return this.history.slice(0, 5);
  }

  isAudioEffectsOn() {
    return (
      this.audioEffectSettings.isSoundCellSelection &&
      this.audioEffectSettings.isSoundSuccessfulPairMatching &&
      this.audioEffectSettings.isSoundInvalidPairAttempts &&
      this.audioEffectSettings.isSoundAssistToolUsage &&
      this.audioEffectSettings.isSoundGameStartAndEnd
    );
  }
}

export { AppModel };

// audio settings

//{
// isSoundCellSelection: true,
// isSoundSuccessfulPairMatching: true,
// isSoundInvalidPairAttempts: true,
// isSoundAssistToolUsage: true,
// isSoundGameStartAndEnd: true,
// }

// history
// {
// date: null,
// gameMode: null,
// finalScore: null,
// outcome: null,
// completionTime: null,
// numberOfMovesMade: null,
// }
