// GameButtonsView.js
import { DOMHelpers } from '../DOMHelpers.js';
import * as c from '../config.js';

class GameButtonsView {
  constructor() {
    this.callbacks = {};
    // Element
    this.element = this.addElementToParent('div', {
      className: 'game-view__btn-container',
    });

    // Control buttons
    this.controlButtons = this.addElementToParent('div', {
      className: 'control-buttons',
      parent: this.element,
    });
    // buttons
    this.btnReset = this.addElementToParent('button', {
      className: "btn control-buttons__btn",
      text: "Reset",
      parent: this.controlButtons,
    });
    this.btnSave = this.addElementToParent('button', {
      className: "btn control-buttons__btn",
      text: "Save",
      parent: this.controlButtons,
    });
    this.btnContinue = this.addElementToParent('button', {
      className: "btn control-buttons__btn",
      text: "Continue",
      parent: this.controlButtons,
    });
    this.btnContinue.disabled = true;
    // listeners
    this.btnReset.addEventListener('click', () => {
      this.callbacks.onClickReset?.();
    });
    this.btnSave.addEventListener('click', () => {
      this.callbacks.onClickSave?.();
    });
    this.btnContinue.addEventListener('click', () => {
      this.callbacks.onClickContinue?.();
    });

    // Assist buttons
    this.assistButtons = this.addElementToParent('div', {
      className: 'assist-buttons',
      parent: this.element,
    });
    // hints
    this.hintsDiv = this.addElementToParent('div', {
      className: 'assist-buttons__btn-container',
      parent: this.assistButtons,
    });
    this.btnHints = this.addElementToParent('button', {
      className: "btn assist-buttons__btn",
      text: "Hints",
      parent: this.hintsDiv,
    });
    this.hintsTxt = this.addElementToParent('span', {
      className: "assist-buttons__counter",
      parent: this.hintsDiv,
    });
    // revert
    this.revertDiv = this.addElementToParent('div', {
      className: 'assist-buttons__btn-container',
      parent: this.assistButtons,
    });
    this.btnRevert = this.addElementToParent('button', {
      className: "btn assist-buttons__btn",
      text: "Revert",
      parent: this.revertDiv,
    });
    this.revertTxt = this.addElementToParent('span', {
      className: "assist-buttons__counter",
      parent: this.revertDiv,
    });
    // add
    this.addDiv = this.addElementToParent('div', {
      className: 'assist-buttons__btn-container',
      parent: this.assistButtons,
    });
    this.btnAdd = this.addElementToParent('button', {
      className: "btn assist-buttons__btn",
      text: "Add",
      parent: this.addDiv,
    });
    this.addTxt = this.addElementToParent('span', {
      className: "assist-buttons__counter",
      parent: this.addDiv,
    });
    // shuffle
    this.shuffleDiv = this.addElementToParent('div', {
      className: 'assist-buttons__btn-container',
      parent: this.assistButtons,
    });
    this.btnShuffle = this.addElementToParent('button', {
      className: "btn assist-buttons__btn",
      text: "Shuffle",
      parent: this.shuffleDiv,
    });
    this.shuffleTxt = this.addElementToParent('span', {
      className: "assist-buttons__counter",
      parent: this.shuffleDiv,
    });
    // eraser
    this.eraserDiv = this.addElementToParent('div', {
      className: 'assist-buttons__btn-container',
      parent: this.assistButtons,
    });
    this.btnEraser = this.addElementToParent('button', {
      className: "btn assist-buttons__btn",
      text: "Eraser",
      parent: this.eraserDiv,
    });
    this.eraserTxt = this.addElementToParent('span', {
      className: "assist-buttons__counter",
      parent: this.eraserDiv,
    });
    // listeners
    this.btnHints.addEventListener('click', () => {
      this.callbacks.onClickHints?.();
      this.callbacks.onPlaySound?.(c.AUDIO_EVENT.ASSIST);
    });
    this.btnRevert.addEventListener('click', () => {
      this.callbacks.onClickRevert?.();
      this.callbacks.onPlaySound?.(c.AUDIO_EVENT.ASSIST);
    });
    this.btnAdd.addEventListener('click', () => {
      this.callbacks.onClickAdd?.();
      this.callbacks.onPlaySound?.(c.AUDIO_EVENT.ASSIST);
    });
    this.btnShuffle.addEventListener('click', () => {
      this.callbacks.onClickShuffle?.();
      this.callbacks.onPlaySound?.(c.AUDIO_EVENT.ASSIST);
    });
    this.btnEraser.addEventListener('click', () => {
      this.callbacks.onClickEraser?.();
      this.callbacks.onPlaySound?.(c.AUDIO_EVENT.ASSIST);
    });
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }

  showCounters({ hint, revert, addNumbers, shuffle, eraser }) {
    this.hintsTxt.textContent = hint;
    this.revertTxt.textContent = revert;
    this.addTxt.textContent = addNumbers;
    this.shuffleTxt.textContent = shuffle;
    this.eraserTxt.textContent = eraser;
  }

  enableContinueBtn() {
    this.btnContinue.disabled = false;
  }
}

Object.assign(GameButtonsView.prototype, DOMHelpers);
export { GameButtonsView }
