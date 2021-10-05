import initialState from '../../constants/gameStateInitialState.constant';
import gameStateActions from '../actions/gameState.actions';

export default function gameStateReducer(gameState = initialState, action: any) {
  let newGameState = gameState;
  switch (action.type) {
    case gameStateActions.START_GAME:
      newGameState = {
        ...newGameState,
        canPlay: true,
        canEdit: false,
      };
      break;
    default:
      break;
  }
  return newGameState;
}
