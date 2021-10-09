export const gameBoardSize = {
  width: 600,
  height: 600,
};

export const dohSize = {
  width: gameBoardSize.width * (2 / 15),
  height: 20,
};

export const ballSize = {
  width: gameBoardSize.width / (10 * 3),
  heigth: gameBoardSize.width / (10 * 3),
};

export const dohGameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const MAX_BOARDS = 6;
export const BREAK_POINTS = 5;
export const LIVES = 3;
