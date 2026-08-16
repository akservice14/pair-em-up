// CellCreator.js
import { CellController } from '../Cell/CellController.js';

// Callbacks
// onUpdateCellValues
// appendCellController
// getControllersArray

//  Render UI - Cells (create and update elements after increase of amount of cells in model)
class CellCreator {
  constructor(callbacks, modelAPI, viewAPI) {
    this.callbacks = callbacks;
    this.modelAPI = modelAPI;
    this.viewAPI = viewAPI;
  }

  createCells() {
    const gameBoard = this.modelAPI.getGameBoardCopy();
    const start = this._findStart(gameBoard);
    if (!start) return;
    for (let row = start.row; row < gameBoard.length; row++) {
      const lastFilled = this.modelAPI.getStatePrimitives().lastFilledCol;
      const colStart = row === start.row ? start.col : 0;
      const colEnd =
        row === gameBoard.length - 1 ? lastFilled + 1 : gameBoard[row].length;
      for (let col = colStart; col < colEnd; col++) {
        this._createCellController(row, col, gameBoard[row][col]);
      }
    }
    this.callbacks.onUpdateCellValues();
  }

  _findStart(gameBoard) {
    for (let row = 0; row < gameBoard.length; row++) {
      const cellControllers = this.callbacks.getControllersArray();
      const controllerRow = cellControllers[row];
      if (!controllerRow) {
        return { row, col: 0 };
      }
      for (let col = 0; col < gameBoard[row].length; col++) {
        if (!controllerRow[col]) {
          return { row, col };
        }
      }
    }
    return null;
  }

  _createCellController(row, col) {
    const cellCallbacks = {
      onCellSelected: this.callbacks.onCellSelected,
      onCellDeselected: this.callbacks.onCellDeselected,
      onPlaySound: this.callbacks.onPlaySound,
    };
    const coordinates = { row, col };
    const controller = new CellController(coordinates, cellCallbacks);
    this.viewAPI.addCellView(controller.view);
    this.callbacks.appendCellController(row, controller);
  }
}
 export { CellCreator }
