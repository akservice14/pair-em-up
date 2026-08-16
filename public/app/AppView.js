// AppView.js
import { DOMHelpers } from './DOMHelpers.js';
import { StartView } from './StartView/StartView.js'
import { GameView } from './GameView/GameView.js'
import { FinishView } from './FinishView/FinishView.js'
import { ModalView } from './ModalView/ModalView.js'

class AppView {
  constructor(callbacks, settingsData) {
    this.callbacks = callbacks;
    this.visibleModal = null;
    // Root
    this.root = this.addElementToParent('div', {
      className: 'app',
      parent: document.body,
    });
    // Header
    this.header = this.addElementToParent('div', {
      className: 'header',
      parent: this.root,
    });
    this.headerLogo = this.addElementToParent('img', {
      className: 'header__logo',
      parent: this.header,
    });
    this.headerLogo.src = '../assets/images/logo.svg';
    this.headerLogo.alt = 'Logo';
    this.headerBtn = this.addElementToParent('button', {
      className: 'btn header__btn',
      text: 'settings',
      parent: this.header,
    });
    // Views
    this.views = this.addElementToParent('div', {
      className: 'app__div-views',
      parent: this.root,
    });
    const startViewCallbacks = {
      onClickContinue: this.callbacks.onClickContinue,
      onClickResults: this.onClickResults,
      onClickGameMode: this.callbacks.onClickGameMode,
    }
    this.startView = new StartView(startViewCallbacks);
    this.views.appendChild(this.startView.getElement());
    this.gameView = new GameView();
    this.views.appendChild(this.gameView.getElement());
    this.finishView = new FinishView();
    this.views.appendChild(this.finishView.getElement());
    // Modals
    this.modalCB = { };
    this.modalResetConfirmCB = {
      onClickResetConf: this.callbacks.onClickResetConf,
    }
    this.modalSettingsCB = {
      onChangeThemeMode: this.callbacks.onChangeThemeMode,
      onChangeAudio: this.callbacks.onChangeAudio,
    }
    this.modals = new ModalView(this.modalCB, this.modalResetConfirmCB, this.modalSettingsCB, settingsData);
    this.root.appendChild(this.modals.getElement());

    // Toasts
    // this.toasts = this.addElementToParent('div', {
    //   className: 'app__toast-layer',
    //   parent: this.root,
    // });

    // Listeners
    this.headerBtn.addEventListener('click', () => {
      this._showSettingsModal();
    });
  }

  getGameView() {
    return this.gameView;
  }

  setSettingsModalData(data) {
    this.modals.setSettingsData(data);
  }

  recreateGameView() {
    this._clearDOMNode(this.gameView.getElement());
    this.views.removeChild(this.gameView.getElement());
    this.gameView = new GameView();
    this.views.appendChild(this.gameView.getElement());
  }

  _clearDOMNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

  renderFinishView(finishInfo, history) {
    this.finishView.render(finishInfo, history);
  }

  setDarkTheme(value) {
    if (value)
      document.body.classList.add('dark-mode');
    else
      document.body.classList.remove('dark-mode');
  };

  // Show Hide Screens
  showStartView(value=true) {
    this._showHideScreen(this.startView.getElement(), value);
  }

  showGameView(value) {
    this._showHideScreen(this.gameView.getElement(), value);
  }

  showFinishView(value) {
    this._showHideScreen(this.finishView.getElement(), value);
  }

  _showHideScreen(el, value) {
    if (value) {
      el.classList.remove("is-hidden");
      el.classList.remove("is-hidden-smooth");
    } else {
      el.classList.add("is-hidden-smooth");
      setTimeout(() => {
        el.classList.add("is-hidden");
      }, 250);
    }
  }

  //Continue button
  showBtnContinue(value) {
    this.startView.showBtnContinue(value);
  }

  // Modals
  _showSettingsModal() {
    this.modals.showSettings();
  }

  _showHistoryModal() {
    const history = this.callbacks.onShowHistory();
    this.modals.showHistory(history);
  }

  showResetConfModal() {
    this.modals.showResetConfirm();
  }

  // StartView Callback
  onClickResults = () => {
    this._showHistoryModal();
  }

  // toast
  // showToast(message, duration = 3000) {
  //   this.addElementToParent('div', {
  //       className: 'toast',
  //       text: message,
  //       parent: this.toasts,
  //     });
  //   setTimeout(() => {
  //     toast.remove();
  //   }, duration);
  // }

}

Object.assign(AppView.prototype, DOMHelpers);
export { AppView };
