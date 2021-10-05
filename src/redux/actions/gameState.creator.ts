import gameStateActions from './gameState.actions';

export function algo() {
  return false;
}

export function canPlayState() {
  return {
    type: gameStateActions.START_GAME,
  };
}
