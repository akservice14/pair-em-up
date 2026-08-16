// SettingsModalView.js
import { DOMHelpers } from '../DOMHelpers.js';

class SettingsModalView {
  constructor(callbacks, data) {
    // Root
    this.callbacks = callbacks;
    this.element = this.addElementToParent('div', {
      className: 'settings-modal',
    });
    // Mode selector
    this.modeSelector = this.addElementToParent('label', {
      className: 'settings-modal__selector',
      parent: this.element,
    });
    this.modeSelectorInput = this.addElementToParent('input', {
      className: 'settings-modal__checkbox',
      parent: this.modeSelector,
    });
    this.modeSelectorInput.type = "checkbox";
    this.modeSelectorInput.checked = data.isDark;
    this.modeSelectorTxt = this.addElementToParent('span', {
      className: 'settings-modal__span',
      text: "Dark Mode",
      parent: this.modeSelector,
    });
    // Audio effects selector
    this.audioSelector = this.addElementToParent('label', {
      className: 'settings-modal__selector',
      parent: this.element,
    });
    this.audioSelectorInput = this.addElementToParent('input', {
      className: 'settings-modal__checkbox',
      parent: this.audioSelector,
    });
    this.audioSelectorInput.type = "checkbox";
    this.audioSelectorInput.checked = data.isAudioOn;
    this.audioSelectorTxt = this.addElementToParent('span', {
      className: 'settings-modal__span',
      text: "Audio Effects",
      parent: this.audioSelector,
    });
    // Listeners
    this.modeSelectorInput.addEventListener('change', () => {
      this.callbacks.onChangeThemeMode();
    })
    this.audioSelectorInput.addEventListener('change', () => {
      this.callbacks.onChangeAudio();
    })
  }

  show() {
    this.element.classList.add('settings-modal--active');
  }

  hide() {
    this.element.classList.remove('settings-modal--active');
  }
}

Object.assign(SettingsModalView.prototype, DOMHelpers);
export { SettingsModalView };

