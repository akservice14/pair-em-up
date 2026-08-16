// Timeservice.js

// Callbacks
// onUpdateTimer

class TimeService {
  constructor(modelAPI, callbacks) {
    this.modelAPI = modelAPI;
    this.callbacks = callbacks;
    this.intervalID = null;
  }

  startTimer() {
    if (this.intervalID) clearInterval(this.intervalID);

    const time = this.convertElapsedTime(
      this.modelAPI.getStatePrimitives().elapsedTime
    );
    this.callbacks.onUpdateTimer(time);

    this.intervalID = setInterval(() => {
      this.modelAPI.updateElapsedTime();
      const time = this.convertElapsedTime(
        this.modelAPI.getStatePrimitives().elapsedTime,
      );
      this.callbacks.onUpdateTimer(time);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  formatDateTime(timestamp = Date.now()) {
    const d = new Date(timestamp);
    const pad = (n) => String(n).padStart(2, '0');
    const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return `${date}\u200B${time}`;
    // return (
    //   `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    //   `${pad(d.getHours())}:${pad(d.getMinutes())}`
    // );
  }

  convertElapsedTime(seconds) {
    if (seconds < 0) return '00:00';
    seconds = seconds % 3600;
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }
}
export { TimeService };
