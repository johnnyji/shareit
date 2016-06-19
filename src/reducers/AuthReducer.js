import {
  AUTHENTICATE,
  AUTHENTICATE_ERROR,
  AUTHENTICATE_SUCCESS,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_PASSWORD
} from '../action_types/AuthActionTypes';
import createReducer from './utils/createReducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  authenticating: false,
  authenticationError: null,
  fetchingCurrentUser: false,
  fetchedCurrentUser: false,
  form: {
    email: {
      value: '',
      error: null
    },
    password: {
      value: '',
      error: null
    }
  },
  loggingOut: false,
  loggedOut: false,
  logoutError: null
});

export default createReducer(initialState, {
  name: 'Auth',
  
  handlers: {
    onAuthenticating: [AUTHENTICATE],
    onAuthenticateError: [AUTHENTICATE_ERROR],
    onAuthenticateSuccess: [AUTHENTICATE_SUCCESS],
    onLoggingOut: [LOGOUT],
    onLogoutError: [LOGOUT_ERROR],
    onLogoutSuccess: [LOGOUT_SUCCESS],
    onUpdateEmail: [UPDATE_EMAIL],
    onUpdatePassword: [UPDATE_PASSWORD]
  },

  onAuthenticating(state) {
    return state.merge({
      authenticating: true,
      fetchingCurrentUser: true,
      fetchedCurrentUser: false
    });
  },

  onAuthenticateError(state, {error}) {
    return state.merge({
      authenticating: false,
      authenticationError: error,
      fetchingCurrentUser: false,
      fetchedCurrentUser: false
    });
  },

  onAuthenticateSuccess(state) {
    return state.merge({
      authenticating: false,
      authenticationError: null,
      fetchingCurrentUser: false,
      fetchedCurrentUser: true
    });
  },

  onLoggingOut(state) {
    return state.merge({
      loggingOut: true,
      loggedOut: false,
      logoutError: null
    });
  },

  onLogoutError(state, {error}) {
    return state.merge({
      loggingOut: false,
      loggedOut: false,
      logoutError: error
    });
  },

  onLogoutSuccess() {
    return initialState;
  },

  onUpdateEmail(state, data) {
    return state.updateIn(['form', 'email'], (email) => email.merge(data));
  },

  onUpdatePassword(state, data) {
    return state.updateIn(['form', 'password'], (email) => email.merge(data));
  }

});
