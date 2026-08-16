// BoardValueMutator.js
import * as bu from './boardUtils.js';
import * as c from '../config.js';

// BoardValueMutatorCallbacks

// checkWinLoseConditions
// renderCounters
// updateAllCellValues
// setValueInCell

//  Mutate board array in MOdel
class BoardValueMutator {
  constructor(callbacks, modelAPI, viewAPI) {
    this.callbacks = callbacks;
    this.modelAPI = modelAPI;
    this.viewAPI = viewAPI;
    this.addNumbersArrayHandler = null;
  }

  // initialization
  setGameboard(mode) {
    if (mode === 'classic') {
      this.modelAPI.initGameBoard(c.CLASSIC_ARRAY.map(row => [...row])); // clone of array
      this.addNumbersArrayHandler = bu.getClassicAddNumbers;
    } else if (mode === 'random') {
      const shuffled = bu.shuffle([...c.RANDOM_NUMBERS]);
      this.modelAPI.initGameBoard([
        shuffled.slice(0, c.NUM_COLS),
        shuffled.slice(c.NUM_COLS, c.NUM_COLS * 2),
        shuffled.slice(c.NUM_COLS * 2, c.NUM_COLS * 3),
      ]);
      this.addNumbersArrayHandler = bu.getRandomAddNumbers;
    } else if (mode === 'chaotic') {
      let res = Array.from({ length: c.INIT_NUM_ROWS }, () =>
        bu.getChaoticArray(c.NUM_COLS),
      );
      this.modelAPI.initGameBoard(res);
      this.addNumbersArrayHandler = bu.getChaoticAddNumbers;
    } else return;
  }

  // success pair selection

  setNullInPair(pair) {
    this.modelAPI.setNullInPair(pair);
  }

  saveLastMove() {
    this.modelAPI.saveLastMove();
  }

  // assist buttons
    handleRevert() {
    if (this.modelAPI.getStatePrimitives().assistButtonCounters.revert <= 0) return;
    const restored = this.modelAPI.restoreLastMove();
    if (!restored) return;
    const { coordinates, values } = restored;
    const [c1, c2] = coordinates;
    const [v1, v2] = values;
    this.modelAPI.setAssistButtonCounter('revert', 0);
    this.callbacks.setValueInCell(c1, v1);
    if (c2 != null) {
      this.modelAPI.updateScore(-1);
      this.callbacks.setValueInCell(c2, v2);
      this.viewAPI.showScore(this.modelAPI.getStatePrimitives().score);
    }
    this.callbacks.renderCounters();
    this.callbacks.checkWinLoseConditions();
  }

  handleAdd() {
    if (this.modelAPI.getStatePrimitives().assistButtonCounters.addNumbers <= 0) return;
    const boardCopy = this.modelAPI.getGameBoardCopy();

    const charset = bu.getCharset(boardCopy);
    const index = this.modelAPI.getStatePrimitives().classicArrayIndex;
    const { newNumbers, newIndex } = this.addNumbersArrayHandler(
      charset,
      charset.length,
      index,
    );
    if (newIndex) this.modelAPI.setClassicArrayIndex(newIndex);
    const { gameBoard: newBoard, lastFilledCol } = bu.appendToBoard(
      boardCopy,
      newNumbers,
      this.modelAPI.getStatePrimitives().lastFilledCol,
    );

    this.modelAPI.addNewCellsToBoard(newBoard, lastFilledCol);
    this.modelAPI.decrementAssistButtonCounter('addNumbers');
    this.callbacks.checkWinLoseConditions();
    this.callbacks.renderCounters();
  }

  handleShuffle() {
    if (this.modelAPI.getStatePrimitives().assistButtonCounters.shuffle <= 0) return;

    const boardCopy = this.modelAPI.getGameBoardCopy();
    const lastArr = boardCopy.length - 1;
    const end = Math.min(this.modelAPI.getStatePrimitives().lastFilledCol + 1, c.NUM_COLS);
    boardCopy[lastArr] = boardCopy[lastArr].slice(0, end);

    const boardFlatCopy = boardCopy.flat();
    const shuffled = bu.shuffle(boardFlatCopy);
    const { twoDArray, lastFilledCol } = bu.transformOneToTwoDArray(shuffled);

    this.modelAPI.shuffleValuesInBoard(twoDArray, lastFilledCol);
    this.modelAPI.decrementAssistButtonCounter('shuffle');
    this.callbacks.checkWinLoseConditions();
    this.callbacks.updateAllCellValues();
    this.callbacks.renderCounters();
  }

  handleEraser() {
    if (this.modelAPI.getStatePrimitives().assistButtonCounters.eraser <= 0) return;
    const coordinates = this._getLastSelectedCell();
    if (!coordinates) return;
    this.modelAPI.decrementAssistButtonCounter('eraser');
    this.modelAPI.saveLastMove();
    this.modelAPI.setNullInOneCell(coordinates);
    this.modelAPI.clearSelectedPair();
    this.callbacks.checkWinLoseConditions();
    this.callbacks.clearCellValueAndDeselect(coordinates);
    this.callbacks.renderCounters();
  }

  _getLastSelectedCell() {
    const pair = this.modelAPI.getSelectedPairCopy();
    return pair?.length ? pair[pair.length - 1] : null;
  }
}

export { BoardValueMutator }
