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
  level: 'info',
  collapsed: true,
  stateTransformer: transformToJs
});

const createStoreWithMiddleware = window.__DEV__
  ? applyMiddleware(thunkMiddleware)(createStore)
  : applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

export default createStoreWithMiddleware(reducers);
