// GameRules.js
import * as mu from './moveUtils.js';
import * as c from '../config.js';

class GameRules {
  constructor() {
  }

  // returns score or null
  validateMove(selectedPair, gameBoard) {
    return mu.validateMove(selectedPair, gameBoard);
  }

  getRemainingMoves(gameBoard) {
    return mu.calculateRemainingMoves(gameBoard);
  }

  getOutcome(gameBoard, score, assistButtonsUsed) {
    if (score >= c.WIN_SCORE) return { outcome: 'Win', msg: c.WIN_MESSAGE };
    if (
      gameBoard.length > c.LOSE_BOARD_LEN ||
      (!this.getRemainingMoves(gameBoard) && assistButtonsUsed)
    )
      return { outcome: 'Lose', msg: c.LOSE_MESSAGE };
    return null;
  }
}

export { GameRules };
