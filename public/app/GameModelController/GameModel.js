// GameModel.js
import * as c from '../config.js';

class GameModel {
  constructor(mode, storedGame, callbacks) {
    this._callbacks = callbacks;
    const source = { ...c.GAME_MODEL_DEFAULT, ...storedGame };
    this.gameMode = source.gameMode || mode;
    this.hasUserSaved = source.hasUserSaved;
    this.gameBoard = source.gameBoard;
    this.score = source.score;
    this.elapsedTime = source.elapsedTime;
    this.lastMove = source.lastMove;
    this.assistButtonCounters = source.assistButtonCounters;
    this.classicArrayIndex = source.classicArrayIndex;
    this.selectedPair = source.selectedPair;
    this.lastFilledCol = source.lastFilledCol;
    this.numberMoves = source.numberMoves;
  }

  // Getters
  getStatePrimitives() {
    return Object.freeze({
      assistButtonCounters: { ...this.assistButtonCounters },
      gameMode: this.gameMode,
      hasUserSaved: this.hasUserSaved,
      score: this.score,
      elapsedTime: this.elapsedTime,
      classicArrayIndex: this.classicArrayIndex,
      lastFilledCol: this.lastFilledCol,
      numberMoves: this.numberMoves,
    });
  }

  getGameBoardCopy() {
    if (!this.gameBoard) return [];
    return this.gameBoard.map((row) => [...row]);
  }

  getSelectedPairCopy() {
    if (!this.selectedPair) return [];
    return this.selectedPair.map((coord) => ({ ...coord }));
  }

  getLastMoveCopy() {
    return this.lastMove
      ? {
          coordinates: this.lastMove.coordinates.map((coord) => ({ ...coord })),
          values: [...this.lastMove.values],
        }
      : null;
  }

  isAssistButtonsUsed() {
    return (
      !this.assistButtonCounters.addNumbers &&
      !this.assistButtonCounters.shuffle &&
      !this.assistButtonCounters.eraser
    );
  }

  // Setters
  setHasUserSaved(value = true) {
    this.hasUserSaved = value;
    this._persist();
  }

  updateElapsedTime() {
    this.elapsedTime += 1;
    this._persist();
  }

  initGameBoard(gameBoard) {
    this.gameBoard = gameBoard;
    this._persist();
    this._callbacks.onNewCellsAdded();
  }

  addNewCellsToBoard(newBoard, lastCell) {
    this._updateGameBoard(newBoard, lastCell);
    this._callbacks.onNewCellsAdded();
    // console.log(newBoard);
  }

  shuffleValuesInBoard(newBoard, lastCell) {
    this._updateGameBoard(newBoard, lastCell);
  }

  _updateGameBoard(newBoard, lastCell) {
    this.gameBoard = newBoard;
    this.lastFilledCol = lastCell;
    this._persist();
  }

  addSelectedCell(coordinates) {
    if (this.selectedPair.length > 1) this.clearSelectedPair();
    this.selectedPair.push(coordinates);
    this._persist();
    return this.selectedPair.length === 2;
  }

  deleteUnselectedCell(coord1) {
    const filtered = this.selectedPair.filter((coord2) => {
      return coord1.row !== coord2.row || coord1.col !== coord2.col;
    });
    this.selectedPair = filtered;
    this._persist();
  }

  clearSelectedPair() {
    this.selectedPair = [];
    this._persist();
  }

  setNullInPair(pair) {
    this.setNullInOneCell(pair[0]);
    if (!pair[1]) return;
    this.setNullInOneCell(pair[1]);
  }

  setNullInOneCell(coordinates) {
    if (
      !this.gameBoard?.[coordinates.row] ||
      this.gameBoard[coordinates.row][coordinates.col] == null
    ) {
      return;
    }
    this.gameBoard[coordinates.row][coordinates.col] = null;
    this._persist();
  }

  // works for pairing and revert (2 or 1 coord in pair)
  saveLastMove() {
    const pair = this.selectedPair;
    const value1 = this.gameBoard[pair[0].row][pair[0].col];
    let value2 = null;
    if (pair.length === 2) value2 = this.gameBoard[pair[1].row][pair[1].col];
    this.lastMove = { coordinates: pair, values: [value1, value2] };
    if (!this.assistButtonCounters.revert) this.assistButtonCounters.revert = 1;
    if (!this.assistButtonCounters.hint) this.assistButtonCounters.hint = null;
    this._persist();
  }

  restoreLastMove() {
    if (!this.lastMove) return;
    const { coordinates, values } = this.lastMove;
    const [c1, c2] = coordinates;
    const [v1, v2] = values;
    this.gameBoard[c1.row][c1.col] = v1;
    if (c2 != null) this.gameBoard[c2.row][c2.col] = v2;
    this.lastMove = null;
    this._persist();
    return { coordinates, values };
  }

  updateScore(num) {
    this.score += num;
    this._persist();
  }

  updateHints(hints) {
    this.assistButtonCounters.hint = hints;
    this._persist();
  }

  incrementMoves() {
    this.numberMoves += 1;
    this._persist();
  }

  setAssistButtonCounter(name, value) {
    this.assistButtonCounters[name] = value;
    this._persist();
  }

  decrementAssistButtonCounter(name) {
    let value = this.assistButtonCounters[name]
    this.assistButtonCounters[name] = value - 1;
    this._persist();
  }

  setClassicArrayIndex(value) {
    this.classicArrayIndex = value;
    this._persist();
  }

  // Persistance
  _persist() {
    this._callbacks.onModelChange('autoSaved', this);
  }

  saveByUser() {
    this._callbacks.onModelChange('userSaved', this);
  }
}

export { GameModel };
