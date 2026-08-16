// moveUtils.js
import * as c from '../config.js';

export function calculateRemainingMoves(gameBoard) {
  const moves = new Set();
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < c.NUM_COLS; j++) {
      if (!gameBoard[i][j]) continue;
      const currentCell = { row: i, col: j };
      let secondCell = null;
      // check same rows and cols
      for (const direction of Object.values(c.DIRECTIONS)) {
        secondCell = findFirstNotNullCell(currentCell, direction, gameBoard);
        if (
          secondCell &&
          validateMove([currentCell, secondCell], gameBoard) > 0
        ) {
          moves.add(createCode(currentCell, secondCell));
        }
      }
      // check wrap up
      secondCell = getWrapUpSecondCell(currentCell, gameBoard);
      if (
        secondCell &&
        validateMove([currentCell, secondCell], gameBoard) > 0
      ) {
        moves.add(createCode(currentCell, secondCell));
      }
    }
  }
  return moves.size;
}

function getWrapUpSecondCell(currentCell, gameBoard) {
  var row = currentCell.row;
  if (row + 1 >= gameBoard.length) return null;
  // check there is NO non-null cell to the right
  var rightCell = findFirstNotNullCell(
    currentCell,
    c.DIRECTIONS.RIGHT,
    gameBoard,
  );
  if (rightCell) return null;
  // find first non-null cell in the next row
  var startNextRow = { row: row + 1, col: -1 };
  var secondCell = findFirstNotNullCell(
    startNextRow,
    c.DIRECTIONS.RIGHT,
    gameBoard,
  );
  // return coordinates of second point (or null)
  return secondCell;
}

// create four numbers code unique for each pair
function createCode(currentCell, secondCell) {
  let combination = [
    `${currentCell.row},${currentCell.col}`,
    `${secondCell.row},${secondCell.col}`,
  ]
    .sort()
    .join('|');
  return combination;
}

export function validateMove(pairOfCoordinates, gameBoard) {
  let score = 0;
  if (
    validateCoordinates(pairOfCoordinates, gameBoard) &&
    validatePosition(pairOfCoordinates, gameBoard)
  )
    score = validateSum(pairOfCoordinates, gameBoard);
  return score;
}

function validateCoordinates(pair, gameBoard) {
  return pair.every(
    (cell) =>
      cell.row >= 0 &&
      cell.row < gameBoard.length &&
      cell.col >= 0 &&
      cell.col < c.NUM_COLS &&
      gameBoard[cell.row][cell.col] != null,
  );
}

function validateSum(pair, gameBoard) {
  const first_num = gameBoard[pair[0].row][pair[0].col];
  const second_num = gameBoard[pair[1].row][pair[1].col];
  let score = 0;

  if (first_num == null || second_num == null) return 0;
  if (first_num === 5 && second_num === 5) score = 3;
  else if (first_num + second_num === 10) score = 2;
  else if (first_num === second_num) score = 1;
  return score;
}

function validatePosition(pair, gameBoard) {
  const [c1, c2] = pair;
  const sameRow = c1.row === c2.row;
  const sameCol = c1.col === c2.col;
  let indexDelta = 0;

  // row and col both same - same cell 2 times
  if (sameRow && sameCol) return false;
  // row and column both diff: check if they are last not null in upper and first not null in lower
  if (!sameRow && !sameCol) return checkWrapUp(pair, gameBoard);
  // Same row or column: find distance between cells
  else if (sameRow) indexDelta = Math.abs(c1.col - c2.col);
  else if (sameCol) indexDelta = Math.abs(c1.row - c2.row);

  // cells are adjucent
  if (indexDelta === 1) return true;
  // check if nulls between cells
  return checkNullsInBetween(pair, sameRow, gameBoard);
}

function checkWrapUp(pair, gameBoard) {
  const [c1, c2] = pair;
  //find upper position
  const upper = c1.row < c2.row ? c1 : c2;
  const lower = c1.row > c2.row ? c1 : c2;
  // compare lower position with result of helper func
  const candidate = getWrapUpSecondCell(upper, gameBoard);
  return (
    candidate && candidate.row === lower.row && candidate.col === lower.col
  );
}

function checkNullsInBetween(pair, sameRow, gameBoard) {
  const [c1, c2] = pair;
  let direction = null;
  // find direction
  if (sameRow && c1.col < c2.col) direction = c.DIRECTIONS.RIGHT;
  else if (sameRow && c1.col > c2.col) direction = c.DIRECTIONS.LEFT;
  else if (!sameRow && c1.row < c2.row) direction = c.DIRECTIONS.DOWN;
  else direction = c.DIRECTIONS.UP;

  const foundCell = findFirstNotNullCell(c1, direction, gameBoard);
  if (!foundCell) return false;
  return foundCell.row === c2.row && foundCell.col === c2.col;
}

function findFirstNotNullCell(startCell, direction, gameBoard) {
  let i = 0;
  let sign = 1;
  if (direction === c.DIRECTIONS.LEFT || direction === c.DIRECTIONS.UP)
    sign = -1;
  let result = null;
  if (direction === c.DIRECTIONS.RIGHT || direction === c.DIRECTIONS.LEFT) {
    i = startCell.col + 1 * sign;
    while (i < c.NUM_COLS && i >= 0 && !gameBoard[startCell.row][i])
      i += 1 * sign;
    if (i < c.NUM_COLS && i >= 0 && gameBoard[startCell.row][i])
      result = { row: startCell.row, col: i };
  } else if (direction === c.DIRECTIONS.UP || direction === c.DIRECTIONS.DOWN) {
    i = startCell.row + 1 * sign;
    while (i < gameBoard.length && i >= 0 && !gameBoard[i][startCell.col])
      i += 1 * sign;
    if (i < gameBoard.length && i >= 0 && gameBoard[i][startCell.col])
      result = { row: i, col: startCell.col };
  }
  return result;
}
