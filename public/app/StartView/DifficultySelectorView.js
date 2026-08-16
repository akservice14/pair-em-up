// DifficultySelectorView.js

import { DOMHelpers } from '../DOMHelpers.js';

class DifficultySelectorView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    // Element
    this.element = this.addElementToParent('div', {
      className: 'difficulty-selector',
    });
    // Buttons
    this.btnClassic = this.addElementToParent('button', {
      className: "btn difficulty-selector__btn",
      text: "classic",
      parent: this.element,
    });
    this.btnRandom = this.addElementToParent('button', {
      className: "btn difficulty-selector__btn",
      text: "random",
      parent: this.element,
    });
    this.btnChaotic = this.addElementToParent('button', {
      className: "btn difficulty-selector__btn",
      text: "chaotic",
      parent: this.element,
    });
    // Listeners
    this.btnClassic.addEventListener('click', () => {
      this.callbacks.onClickGameMode('classic');
    });
    this.btnRandom.addEventListener('click', () => {
      this.callbacks.onClickGameMode('random');
    });
    this.btnChaotic.addEventListener('click', () => {
      this.callbacks.onClickGameMode('chaotic');
    });
  }
}

Object.assign(DifficultySelectorView.prototype, DOMHelpers);
export { DifficultySelectorView }
