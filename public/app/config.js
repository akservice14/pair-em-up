// config.js

export const WIN_SCORE = 10;
export const LOSE_BOARD_LEN = 10;

export const APP_MODEL_DEFAULT = {
  isDarkTheme: false,
  audioEffectSettings: {
    isSoundCellSelection: true,
    isSoundSuccessfulPairMatching: true,
    isSoundInvalidPairAttempts: true,
    isSoundAssistToolUsage: true,
    isSoundGameStartAndEnd: true,
  },
  history: [],
};

export const CLASSIC_ARRAY = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 1, 1, 2, 1, 3, 1, 4, 1],
  [5, 1, 6, 1, 7, 1, 8, 1, 9],
];

export const RANDOM_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8,
  9,
];

export const CHAOTIC_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const NUM_COLS = 9;
export const INIT_NUM_ROWS = 3;

export const GAME_MODEL_DEFAULT = {
  gameMode: null,
  hasUserSaved: false,
  gameBoard: null,
  score: 0,
  elapsedTime: 0,
  lastMove: null,
  assistButtonCounters: {
    hint: null,
    revert: 1,
    addNumbers: 10,
    shuffle: 5,
    eraser: 5,
  },
  classicArrayIndex: 0,
  selectedPair: [],
  lastFilledCol: 8,
  numberMoves: 0,
};

export const DIRECTIONS = Object.freeze({
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
});

export const GITHUB = "https://github.com";
export const WIN_MESSAGE = "Great job!";
export const LOSE_MESSAGE = "Better luck next time";

export const AUDIO_EVENT = Object.freeze({
  ASSIST: 'assist',
  SELECT: 'select',
  FAIL: 'pair-fail',
  SUCCESS: 'success',
  START: 'start',
  WIN: 'win',
  LOSE: 'lose',
});

export const SOUNDS_MAP = {
    'assist': '../assets/sounds/assist.mp3',
    'select': '../assets/sounds/select.mp3',
    'pair-fail': '../assets/sounds/pair-fail.mp3',
    'success': '../assets/sounds/pair-success.mp3',
    'start': '../assets/sounds/start.mp3',
    'win': '../assets/sounds/win.mp3',
    'lose': '../assets/sounds/lose.mp3',
}

// history
// {
//   date: null,
//   gameMode: null,
//   finalScore: null,
//   outcome: null,
//   completionTime: null,
//   numberOfMovesMade: null,
// }
