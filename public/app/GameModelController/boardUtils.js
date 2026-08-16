// boardUtils.js
// mutate arrays !
import * as c from '../config.js';

export function getCharset(gameBoard) {
  return gameBoard.flat().filter((value) => value !== null);
}

export function getClassicAddNumbers(charset, lengthToAdd, index = 0) {
  return getClassicArray(lengthToAdd, charset, index);
}
export function getRandomAddNumbers(charset, ..._unused) {
  /* eslint-disable-next-line no-unused-vars */
  const result = shuffle(charset);
  return { newNumbers: result, newIndex: null };
}
export function getChaoticAddNumbers(charset, lengthToAdd, ..._unused) {
  /* eslint-disable-next-line no-unused-vars */
  const result = getChaoticArray(lengthToAdd, charset);
  return { newNumbers: result, newIndex: null };
}

export function shuffle(array) {
  const result = [...array];
  let currentIndex = result.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }
  return result;
}

export function getChaoticArray(len) {
  const result = [];
  const randomInts = new Uint32Array(len);
  // fill with secure random values (0 ≤ value ≤ 2^32-1)
  window.crypto.getRandomValues(randomInts);
  for (let i = 0; i < len; i++) {
    const index = randomInts[i] % c.CHAOTIC_NUMBERS.length;
    result.push(c.CHAOTIC_NUMBERS[index]);
  }
  return result;
}

export function getClassicArray(lengthToAdd, charset, index) {
  const result = [];
  // const classic = [...c.CLASSIC_ARRAY];
  const classicFlat = c.CLASSIC_ARRAY.flat();
  while (result.length < lengthToAdd && charset.length > 0) {
    const num = classicFlat[index];
    // Check if num exists in charset
    const i = charset.indexOf(num);
    if (i !== -1) {
      result.push(num);
      charset.splice(i, 1);
    }
    index = (index + 1) % classicFlat.length;
  }
  return { newNumbers: result, newIndex: index };
}

export function appendToBoard(gameBoard, newNumbers, lastCellColumn) {
  if (!newNumbers.length) return { gameBoard, lastFilledCol: lastCellColumn };
  const lastRow = gameBoard[gameBoard.length - 1];
  let qtyToFill = 0;
  if (lastCellColumn < 8) {
    const firstFreeIndex = lastCellColumn + 1;
    const freeCells = c.NUM_COLS - firstFreeIndex;
    qtyToFill = Math.min(freeCells, newNumbers.length);
    for (let i = 0; i < qtyToFill; i++) {
      lastRow[firstFreeIndex + i] = newNumbers[i];
    }
  }
  newNumbers = newNumbers.slice(qtyToFill);
  const { twoDArray, lastFilledCol } = transformOneToTwoDArray(newNumbers);
  gameBoard.push(...twoDArray);
  return { gameBoard, lastFilledCol };
}

export function transformOneToTwoDArray(array) {
  const twoDArray = [];
  let lastFilledCol = c.NUM_COLS - 1;
  while (array.length > 0) {
    const row = array.splice(0, c.NUM_COLS);
    if (row.length < c.NUM_COLS) lastFilledCol = row.length - 1;
    while (row.length < c.NUM_COLS) row.push(null);
    twoDArray.push(row);
  }
  return { twoDArray, lastFilledCol };
}
