// StartView.js
import { DOMHelpers } from '../DOMHelpers.js';
import * as c from '../config.js';

import { DifficultySelectorView } from './DifficultySelectorView.js'

class StartView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    // Element
    this.element = this.addElementToParent('div', {
      className: 'start-view',
    });
    // Title
    this.title = this.addElementToParent('div', {
      className: "start-view__title",
      parent: this.element,
    });
    this.titleTxt = this.addElementToParent('h1', {
      text: "pair em up",
      parent: this.title,
    });
    // Author
    this.author = this.addElementToParent('div', {
      className: "start-view__author",
      parent: this.element,
    });
    this.authorLink = this.addElementToParent('a', {
      className: "start-view__author-link",
      text: "Author's GitHub",
      parent: this.author,
    });
    this.authorLink.href = c.GITHUB;
    this.authorLink.target="_blank";
    // Difficulty selector
    const selectorCallbacks = {
      onClickGameMode: this.callbacks.onClickGameMode,
    }
    this.difficultySelectorView = new DifficultySelectorView(selectorCallbacks);
    this.element.appendChild(this.difficultySelectorView.getElement());
    // Buttons
    this.btnContinue = this.addElementToParent('button', {
      className: "btn start-view__btn start-view__btn--continue is-hidden",
      text: "continue",
      parent: this.element,
    });
    this.btnResults = this.addElementToParent('button', {
      className: "btn start-view__btn start-view__btn--results",
      text: "results",
      parent: this.element,
    });
    // Listeners
    this.btnContinue.addEventListener('click', () => {
      this.callbacks.onClickContinue();
    });
    this.btnResults.addEventListener('click', () => {
      this.callbacks.onClickResults();
    });
  }

  showBtnContinue(value) {
    if (value) {
      this.btnContinue.classList.remove('is-hidden');
      this.btnContinue.disabled = false;
    } else {
      this.btnContinue.classList.add('is-hidden');
      this.btnContinue.disabled = true;
    }
  }
}

Object.assign(StartView.prototype, DOMHelpers);
export { StartView }
