// CellController.js
import { CellModel } from './CellModel.js'
import { CellView} from './CellView.js'
import * as c from '../config.js';

class CellController {
  constructor(coordinates, callbacks) {
    this.callbacks = callbacks;
    this.model = new CellModel(coordinates);
    this.viewCallbacks = {
      onClickCell: this.onClickCell,
    }
    this.view = new CellView(this.viewCallbacks);
  }

  showValue(value) {
    this.view.showValue(value);
  }

  clearCell() {
    this.view.clearCell();
  }

  deselectCellAfterAssessment() {
    this.model.deselect();
    this.view.setUnsetSelected(this.model.isSelected);
  }

  dispose() {
    this.model.isSelected = false;
    if (this.view && this.view.parentNode) {
      this.view.parentNode.removeChild(this.view);
    }
    this.view = null;
  }

  // View callback
  onClickCell = () => {
    const coordinates = this.model.getCoordinates();

    this.model.toggleIsSelected();
    this.view.setUnsetSelected(this.model.isSelected);
    this.callbacks.onPlaySound(c.AUDIO_EVENT.SELECT);

    if (this.model.isSelected)
      this.callbacks.onCellSelected(coordinates);
    else
      this.callbacks.onCellDeselected(coordinates);
  }
}

export { CellController }


