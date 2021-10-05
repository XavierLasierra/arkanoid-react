import initialState from '../../constants/boardsInitialState.constant';
import gameStateActions from '../actions/gameState.actions';

export default function gameStateReducer(boards = initialState, action: any) {
  const newBoards = boards;
  switch (action.type) {
    case gameStateActions.SELECT_BOARD:
      break;
    default:
      break;
  }
  return newBoards;
}
