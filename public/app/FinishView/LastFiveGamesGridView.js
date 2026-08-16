// LastFiveGamesGridView.js

import { DOMHelpers } from '../DOMHelpers.js';

class LastFiveGamesGridView {
  constructor() {
    // Element
    this.element = this.addElementToParent('div', {
      className: 'last-five-games__grid last-five-games__grid--hidden',
    });
    // Columns order
    this.columns = ['date', 'gameMode', 'outcome', 'finalScore', 'completionTime'];
  }

  addHistoryRows(history) {
    this.element.replaceChildren();
    this._addHeaderRow();
    const className = 'last-five-games__row';
    for (let game of history) {
      this._addRow(game, className);
    }
  }

  show() {
    this.element.classList.remove('last-five-games__grid--hidden');
    this.element.classList.add('last-five-games__grid--visible');
  }

  hide() {
    this.element.classList.remove('last-five-games__grid--visible');
    this.element.classList.add('last-five-games__grid--hidden');
  }

  _addHeaderRow() {
    const header = {
      date: 'Date',
      gameMode: 'Mode',
      outcome: 'Result',
      finalScore: 'Score',
      completionTime: 'Time',
    };
    const className = 'last-five-games__row last-five-games__row--header';
    this._addRow(header, className);
  }

  _addRow(rowData, className) {
    for (const key of this.columns) {
      const value = rowData[key] ?? '';
      let wrapper = this.addElementToParent('div', {
        className: className,
        parent: this.element,
      });
      this.addElementToParent('span', {
        className: 'last-five-games__txt',
        text: value,
        parent: wrapper,
      });
    }
  }
}

Object.assign(LastFiveGamesGridView.prototype, DOMHelpers);
export { LastFiveGamesGridView };
