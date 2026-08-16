// ModalView.js
import { LastFiveGamesGridView } from '../FinishView/LastFiveGamesGridView.js'
import { ResetConfirmModalView } from './ResetConfirmView.js'
import { SettingsModalView } from './SettingsModalView.js';
import { DOMHelpers } from '../DOMHelpers.js';

class ModalView {
  constructor(modalCallbacks, resetCallbacks, settingsCallbacks, settingsData) {
    this.callbacks = modalCallbacks;
    // Root
    this.element = this.addElementToParent('div', {
      className: "modal-layer modal-layer--closed",
    });
    // Wrapper
    this.wrapper = this.addElementToParent('div', {
      className: 'modal-layer__wrapper',
      parent: this.element,
    });
    // Cross button
    this.crossBtn = this.addElementToParent('button', {
      className: 'modal-layer__btn',
      parent: this.wrapper,
    });
    this.crossIcon = this.addElementToParent('img', {
      className: 'modal-layer__btn-icon',
      parent: this.crossBtn,
    });
    this.crossIcon.src = '../../assets/images/close-button.svg';
    this.crossIcon.alt = 'Close';
    // History
    this.history = new LastFiveGamesGridView();
    this.wrapper.appendChild(this.history.getElement());
    this.history.hide();
    // Empty history message
    this.msgDiv = this.addElementToParent('div', {
      className: 'modal-layer__txt',
      parent: this.wrapper,
    });
    this.msgTxt = this.addElementToParent('span', {
      text: 'No history yet',
      parent: this.msgDiv,
    });
    // Settings
    this.settings = new SettingsModalView(settingsCallbacks, settingsData);
    this.wrapper.appendChild(this.settings.getElement());
    // Reset Confirmation
    this.resetCB = resetCallbacks;
    this.resetCB.onResetConfirmBtnClick = this.onResetConfirmBtnClick;
    this.resetConfirm = new ResetConfirmModalView(this.resetCB);
    this.wrapper.appendChild(this.resetConfirm.getElement());
    // data
    this.visibleChild = null;
    // Listeners
    this.crossBtn.addEventListener('click', () => {
      this.onCrossClick();
    });
    this.element.addEventListener('click', (e) => {
      if (e.target !== this.element) return;
      this.onCrossClick();
    });
  }

  showHistory(history) {
    if (history.length > 0) {
      this.history.addHistoryRows(history);
      this._showChild(this.history);
    }
    else
      this._showEmptyHistoryMsg();
    this._showModal();
  }
  showSettings() {
    this._showChild(this.settings);
    this._showModal();
  }
  showResetConfirm() {
    this._showChild(this.resetConfirm);
    this._showModal();
  }
  _showChild(child) {
    if (this.visibleChild) this._hideVisibleChild();
    this._hideEmptyHistoryMsg();
    this.visibleChild = child;
    child.show();
  }
  _showEmptyHistoryMsg() {
    this.msgDiv.classList.add('modal-layer__txt--visible');
  }
  _showModal() {
    this.element.classList.remove('modal-layer--closed');
    this.element.classList.add('modal-layer--open');
  }

  onCrossClick = () => {
    if (this.visibleChild == this.resetConfirm) this.resetConfirm.onCrossClick();
    this._hideEmptyHistoryMsg();
    this._hideVisibleChild();
    this._hideModal();
  }

  onResetConfirmBtnClick = () => {
    this._hideEmptyHistoryMsg();
    this._hideVisibleChild();
    this._hideModal();
  }

  _hideEmptyHistoryMsg() {
    this.msgDiv.classList.remove('modal-layer__txt--visible');
  }
  _hideVisibleChild() {
    if (this.visibleChild)
      this.visibleChild.hide();
    this.visibleChild = null;
  }
  _hideModal() {
    this.element.classList.remove('modal-layer--open');
    this.element.classList.add('modal-layer--closed');
  }
}

Object.assign(ModalView.prototype, DOMHelpers);
export { ModalView };
