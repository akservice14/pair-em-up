// ResultsTextView.js
import { DOMHelpers } from '../DOMHelpers.js';

class ResultsTextView {
  constructor() {
    // Element
    this.element = this.addElementToParent('div', {
      className: 'results',
    });

    // Outcome
    this.outcomeDiv = this.addElementToParent('div', {
      className: 'results__txt',
      parent: this.element,
    });
    this.outcomeTxt = this.addElementToParent('span', {
      parent: this.outcomeDiv,
    });

    // Message
    this.msgDiv = this.addElementToParent('div', {
      className: 'results__txt',
      parent: this.element,
    });
    this.msgTxt = this.addElementToParent('span', {
      parent: this.msgDiv,
    });

    // Score
    this.scoreDiv = this.addElementToParent('div', {
      className: 'results__txt',
      parent: this.element,
    });
    this.scoreTxt = this.addElementToParent('span', {
      parent: this.scoreDiv,
    });

    // Time
    this.timeDiv = this.addElementToParent('div', {
      className: 'results__txt',
      parent: this.element,
    });
    this.timeTxt = this.addElementToParent('span', {
      parent: this.timeDiv,
    });
  }

  showInfo({outcome, msg, score, time}) {
    this.outcomeTxt.textContent = `You ${outcome}`;
    this.msgTxt.textContent = msg;
    this.scoreTxt.textContent = `Your score: ${score}`;
    this.timeTxt.textContent = `Time: ${time}`;
  }
}

Object.assign(ResultsTextView.prototype, DOMHelpers);
export { ResultsTextView }
