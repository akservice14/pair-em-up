// CellView.js
import { DOMHelpers } from '../DOMHelpers.js';


class CellView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    // Element
    this.element = this.addElementToParent('div', {
      className: 'tile',
    });
    // Text
    this.cellTxt = this.addElementToParent('span', {
      className: 'tile__txt',
      text: '',
      parent: this.element,
    });
    // Listener
    this.element.addEventListener('click', () => {
      this.callbacks.onClickCell();
    });
  }

  showValue(text) {
    this.cellTxt.textContent = text;
  }

  clearCell() {
    this.element.classList.add('tile--removing');
    setTimeout(() => {
      this.cellTxt.textContent = '';
      this.element.classList.remove('tile--removing');
    }, 250);
  }

  setUnsetSelected(value=true) {
    if (value)
      this.element.classList.add("tile--selected");
    else
      this.element.classList.remove("tile--selected");
  }

  setSuccessSelection() {
    this.element.classList.remove("tile--selected");
    this.element.classList.add("tile--matched");
    setTimeout(() => {
      this.setUnsetSelected(false);
      this.element.classList.remove("tile--matched");
    }, 500)
  }

  setFailSelection() {
    this.element.classList.remove("tile--selected");
    this.element.classList.add("tile--wrong");
    setTimeout(() => {
      this.setUnsetSelected(false);
      this.element.classList.remove("tile--wrong");
    }, 500)
  }
}

Object.assign(CellView.prototype, DOMHelpers);
export { CellView }
