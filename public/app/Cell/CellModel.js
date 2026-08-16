// CellModel.js

class CellModel {
  constructor({row, col}) {
    this.row = row;
    this.col = col;
    this.isSelected = false;
  }

  getCoordinates() {
    return { row: this.row, col: this.col };
  }

  toggleIsSelected() {
    this.isSelected = !this.isSelected;
  }

  deselect() {
    this.isSelected = false;
  }
}

export { CellModel };
