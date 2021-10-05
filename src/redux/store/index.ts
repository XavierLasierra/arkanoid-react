import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

export default function configureStore(initialState?: any) {
  const composeEnhancers = composeWithDevTools || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(),
  );
}
