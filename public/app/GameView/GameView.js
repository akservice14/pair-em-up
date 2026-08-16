// GameView
import { DOMHelpers } from '../DOMHelpers.js';
import { GameInfoView } from './GameInfoView.js';
import { GameButtonsView } from './GameButtonsView.js';

class GameView {
  constructor() {
    this.callbacks = {};
    // Element
    this.element = this.addElementToParent('div', {
      className: 'game-view is-hidden is-hidden-smooth',
    });
    // Tablo
    this.gameInfoView = new GameInfoView();
    this.element.appendChild(this.gameInfoView.getElement());
    // Grid
    this.grid = this.addElementToParent('div', {
      className: 'game-view__grid',
      parent: this.element,
    });
    this._makeVisualEffectStart();
    // Buttons
    this.gameButtonsView = new GameButtonsView();
    this.element.appendChild(this.gameButtonsView.getElement());
  }

  _makeVisualEffectStart() {
    setTimeout(() => {
      this.grid.classList.add("grid--show");
    }, 50);
  }

  makeVisualEffectFinish(outcome) {
    const resultClass = outcome === 'Win' ? "grid--win" : "grid--lose";
    this.grid.classList.add(resultClass);
    setTimeout(() => {
      this.grid.classList.remove(resultClass);
    }, 400);
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
    const buttonsCallbacks = {
      onClickReset: this.callbacks.onClickReset,
      onClickSave: this.callbacks.onClickSave,
      onClickContinue: this.callbacks.onClickContinue,
      onClickHints: this.callbacks.onClickHints,
      onClickRevert: this.callbacks.onClickRevert,
      onClickAdd: this.callbacks.onClickAdd,
      onClickShuffle: this.callbacks.onClickShuffle,
      onClickEraser: this.callbacks.onClickEraser,
      onPlaySound: this.callbacks.onPlaySound,
    }
    this.gameButtonsView.setCallbacks(buttonsCallbacks);
  }

  showMode(mode) {
    this.gameInfoView.showMode(mode);
  }

  showScore(score) {
    this.gameInfoView.showScore(score);
  }

  showTimer(timer) {
    this.gameInfoView.showTimer(timer);
  }

  showBtnCounters(counters){
    this.gameButtonsView.showCounters(counters);
  }

  addCellView(cellView) {
    this.grid.appendChild(cellView.getElement());
  }

  enableContinueBtn() {
    this.gameButtonsView.enableContinueBtn();
  }
}

Object.assign(GameView.prototype, DOMHelpers);
export { GameView }
