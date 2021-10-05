import gameStateActions from './gameState.actions';

export function canPlayState() {
  return {
    type: gameStateActions.START_GAME,
  };
}

export function selectBoard(board: number) {
  return {
    type: gameStateActions.SELECT_BOARD,
    data: board,
  };
}

export function createBoard() {
  return {
    type: gameStateActions.CREATE_BOARD,
  };
}
