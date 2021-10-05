import { combineReducers } from 'redux';
import gameState from './gameState.reducer';
import boards from './boards.reducer';

export default combineReducers({
  gameState,
  boards,
});
