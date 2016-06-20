import {
  ON_CONNECTED,
  ON_CONNECTING,
  ON_DISCONNECT,
  SET_ALERT
} from '../action_types/AppActionTypes';
import {
  WRITE_NAME_SUCCESS,
  WRITE_USERNAME_SUCCESS
} from '../action_types/OnboardingActionTypes';
import {AUTHENTICATE_SUCCESS} from '../action_types/AuthActionTypes';
import {FETCH_LOCATION_SUCCESS} from '../action_types/LocationFetchingActionTypes';
import createReducer from './utils/createReducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  alert: {
    title: null,
    message: null
  },
  connecting: false,
  connected: false,
  currentUser: null
});

export default createReducer(initialState, {
  name: 'App',

  handlers: {
    onSetCurrentUser: [AUTHENTICATE_SUCCESS],
    onUpdateCurrentUser: [
      // When the user's location updates
      FETCH_LOCATION_SUCCESS,
      // Update fullName
      WRITE_NAME_SUCCESS,
      // Update username
      WRITE_USERNAME_SUCCESS
    ],
    onServerConnecting: [ON_CONNECTING],
    onServerConnected: [ON_CONNECTED],
    onServerDisconnect: [ON_DISCONNECT],
    onSetAlert: [SET_ALERT]
  },

  onSetCurrentUser(state, {user}) {
    return state.set('currentUser', Immutable.fromJS(user));
  },

  onUpdateCurrentUser(state, {user}) {
    return state.merge({currentUser: user});
  },

  onServerConnected(state) {
    return state.merge({
      connecting: false,
      connected: true
    });
  },

  onServerConnecting(state) {
    return state.merge({
      connecting: true,
      connected: false
    });
  },

  onServerDisconnect(state) {
    return state.set({
      connecting: false,
      connected: false
    });
  },

  onSetAlert(state, {title, message}) {
    return state.merge({
      alert: {title, message}
    });
  }

});
