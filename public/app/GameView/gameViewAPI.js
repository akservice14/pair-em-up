// gameViewAPI.js

export const gameViewAPI = (view) => ({
  makeVisualEffectFinish: (outcome) => view.makeVisualEffectFinish(outcome),
  showMode: (mode) => view.showMode(mode),
  showScore: (score) => view.showScore(score),
  showTimer: (time) => view.showTimer(time),
  showBtnCounters: (counters) => view.showBtnCounters(counters),
  addCellView: (cellView) => view.addCellView(cellView),
  enableContinueBtn: () => view.enableContinueBtn(),
});
