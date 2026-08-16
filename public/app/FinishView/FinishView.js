// FinishView.js

import { DOMHelpers } from '../DOMHelpers.js';
import { LastFiveGamesGridView } from './LastFiveGamesGridView.js';
import { ResultsTextView } from './ResultsTextView.js';

class FinishView {
  constructor() {
    // Element
    this.element = this.addElementToParent('div', {
      className: 'finish-view is-hidden is-hidden-smooth',
    });
    // Game Result Info
    this.resultsTextView  = new ResultsTextView ();
    this.element.appendChild(this.resultsTextView.getElement());
    // History
    this.lastFiveGamesGridView  = new LastFiveGamesGridView ();
    this.element.appendChild(this.lastFiveGamesGridView.getElement());

    // Empty history message
    this.msgDiv = this.addElementToParent('div', {
      className: 'finish-view__txt is-hidden',
      parent: this.element,
    });
    this.msgTxt = this.addElementToParent('span', {
      text: 'No history yet',
      parent: this.msgDiv,
    });
  }

  render(finishInfo, history) {
    this.resultsTextView.showInfo(finishInfo);
    if (history.length > 0) {
      this.lastFiveGamesGridView.addHistoryRows(history);
      this.lastFiveGamesGridView.show();
    }
    else
      this._showEmptyHistoryMsg();
  }

  _showEmptyHistoryMsg() {
    this.msgDiv.classList.remove('is-hidden');
  }

  _hideEmptyHistoryMsg() {
    this.msgDiv.classList.add('is-hidden');
  }

}

Object.assign(FinishView.prototype, DOMHelpers);
export { FinishView }
