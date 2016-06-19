import {
  ON_CONNECT,
  ON_DISCONNECT,
  SET_ALERT
} from '../action_types/AppActionTypes';
import {
  AUTHENTICATE_SUCCESS
} from '../action_types/AuthActionTypes';
import {
  WRITE_NAME_SUCCESS
} from '../action_types/OnboardingActionTypes';
import createReducer from './utils/createReducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  alert: {
    title: null,
    message: null
  },
  currentUser: null,
  isConnected: false
});

export default createReducer(initialState, {
  name: 'App',

  handlers: {
    onSetCurrentUser: [AUTHENTICATE_SUCCESS, WRITE_NAME_SUCCESS],
    onServerConnect: [ON_CONNECT],
    onServerDisconnect: [ON_DISCONNECT],
    onSetAlert: [SET_ALERT]
  },

  onSetCurrentUser(state, {user}) {
    return state.set('currentUser', Immutable.fromJS(user));
  },

  onServerConnect(state) {
    return state.set('isConnected', true);
  },

  onServerDisconnect(state) {
    return state.set('isConnected', false);
  },

  onSetAlert(state, {title, message}) {
    return state.merge({
      alert: {title, message}
    });
  }

});
