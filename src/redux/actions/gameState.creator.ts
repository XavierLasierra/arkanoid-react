import gameStateActions from './gameState.actions';

export function canPlayState() {
  return {
    type: gameStateActions.START_GAME,
  };
}

export function canEditState() {
  return {
    type: gameStateActions.START_EDIT,
  };
}

export function selectBoard(data: number) {
  return {
    type: gameStateActions.SELECT_BOARD,
    data,
  };
}

export function createBoard() {
  return {
    type: gameStateActions.CREATE_BOARD,
  };
}

export function discardBoardChanges() {
  return {
    type: gameStateActions.DISCARD_EDIT,
  };
}

export function startBoardSave() {
  return {
    type: gameStateActions.START_SAVE,
  };
}

export function saveBoardChanges(data: number[][], saveBoard: number) {
  return {
    type: gameStateActions.SAVE_EDIT,
    data,
    saveBoard,
  };
}
