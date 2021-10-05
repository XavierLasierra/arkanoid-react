import initialState from '../../constants/gameStateInitialState.constant';
import gameStateActions from '../actions/gameState.actions';

export default function gameStateReducer(gameState = initialState, action: any) {
  const newGameState = gameState;
  switch (action.type) {
    case gameStateActions.START_GAME:
      break;
    default:
      break;
  }
  return newGameState;
}
