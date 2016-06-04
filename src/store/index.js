/*
  Redux Store Configurations
 */

import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers/index';

// Transforms state data from Immutable to JS
const transformToJs = (state) => {
  const transformedState = {};
  for (const key in state) {
    if (state.hasOwnProperty(key)) transformedState[key] = state[key].toJS();
  }
  return transformedState;
};

const loggerMiddleware = createLogger({
  stateTransformer: transformToJs
});

const createStoreWithMiddleware = window.__DEV__
  ? applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)
  : applyMiddleware(thunkMiddleware)(createStore);

export default createStoreWithMiddleware(reducers);
