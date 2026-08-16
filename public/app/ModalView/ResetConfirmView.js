//  ResetConfirmModalView.js
import { DOMHelpers } from '../DOMHelpers.js';

class ResetConfirmModalView {
  constructor(callbacks) {
    // Root
    this.callbacks = callbacks;
    this.element = this.addElementToParent('div', {
      className: 'reset-confirm-modal',
    });
    // Question
    this.question = this.addElementToParent('div', {
      className: 'reset-confirm-modal__question',
      parent: this.element,
    });
    this.questionTxt = this.addElementToParent('span', {
      className: 'reset-confirm-modal__text',
      text: "Starting a new game will erase your current progress. Do you want to continue?",
      parent: this.question,
    });
    // Buttons
    this.buttons = this.addElementToParent('div', {
      className: 'reset-confirm-modal__buttons',
      parent: this.element,
    });
    this.btnYes = this.addElementToParent('button', {
      className: 'btn reset-confirm-modal__yes-button',
      text: 'Continue',
      parent: this.buttons,
    });
    this.btnNo = this.addElementToParent('button', {
      className: 'btn reset-confirm-modal__no-button',
      text: 'Cancel',
      parent: this.buttons,
    });
    // Listeners
    this.btnYes.addEventListener('click', () => {
      this.callbacks.onClickResetConf(true);
      this.callbacks.onResetConfirmBtnClick();
    });
    this.btnNo.addEventListener('click', () => {
      this.callbacks.onClickResetConf(false);
      this.callbacks.onResetConfirmBtnClick();
    });
  }

  show() {
    this.element.classList.add('reset-confirm-modal--active');
  }

  hide() {
    this.element.classList.remove('reset-confirm-modal--active');
  }

  onCrossClick() {
    this.callbacks.onClickResetConf(false);
  }
}

Object.assign(ResetConfirmModalView.prototype, DOMHelpers);
export { ResetConfirmModalView };
