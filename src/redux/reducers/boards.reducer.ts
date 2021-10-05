import initialState from '../../constants/boardsInitialState.constant';
import gameStateActions from '../actions/gameState.actions';

export default function gameStateReducer(boards = initialState, action: any) {
  let newBoards = boards;
  switch (action.type) {
    case gameStateActions.CREATE_BOARD:
      newBoards = [
        ...newBoards,
        initialState[0],
      ];
      break;
    default:
      break;
  }
  return newBoards;
}
