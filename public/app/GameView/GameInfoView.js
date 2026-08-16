// GameInfoView.js
import { DOMHelpers } from '../DOMHelpers.js';

class GameInfoView {
  constructor() {
    this.element = this.addElementToParent('div', {
      className: 'game-view__txt-container',
    });
    // Mode
    this.modeDiv = this.addElementToParent('div', {
      className: 'game-view__txt-mode',
      parent: this.element,
    });
    this.modeTxt = this.addElementToParent('h2', {
      parent: this.modeDiv,
    });

    // Score
    this.scoreDiv = this.addElementToParent('div', {
      className: 'game-view__txt-score',
      parent: this.element,
    });
    this.scoreTxt = this.addElementToParent('h2', {
      parent: this.scoreDiv,
    });

    // Timer
    this.timerDiv = this.addElementToParent('div', {
      className: 'game-view__txt-timer',
      parent: this.element,
    });
    this.timerTxt = this.addElementToParent('h2', {
      parent: this.timerDiv,
    });
  }

  showMode(mode) {
    this.modeTxt.textContent = mode;
  }

  showScore(score) {
    this.scoreTxt.textContent = `${score} / 100`;
    this.scoreDiv.classList.add('is-updating');
    setTimeout(() => {
      this.scoreDiv.classList.remove('is-updating');
    }, 250);
  }

  showTimer(timer) {
    this.timerTxt.textContent = timer;
    this.timerDiv.classList.add('is-ticking');
    setTimeout(() => {
      this.timerDiv.classList.remove('is-ticking');
    }, 200);
  }
}

Object.assign(GameInfoView.prototype, DOMHelpers);
export { GameInfoView }
