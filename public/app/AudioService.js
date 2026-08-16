// AudioService.js
import * as c from './config.js'

class AudioService {
  constructor() {
    this.cache = new Map();
    this.isDisabled = false;
    this.soundsMap = c.SOUNDS_MAP;
    // Preload all sounds
    for (const key in this.soundsMap) {
      const audio = new Audio(this.soundsMap[key]);
      this.cache.set(this.soundsMap[key], audio);
    }
  }

  playSound(audioEvent) {
    const path = this.soundsMap[audioEvent];
    if (this.isDisabled || !path) return;
    let audio = this.cache.get(path);
    if (!audio) {
      audio = new Audio(path);
      this.cache.set(path, audio);
    }
    audio.currentTime = 0;
    audio.play();
  }

  disableAudio(value=true) {
    this.isDisabled = value;
  }
}

export { AudioService };
