import {
  AUTHENTICATE,
  AUTHENTICATE_ERROR,
  AUTHENTICATE_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_PASSWORD
} from '../action_types/AuthActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  authenticating: false,
  authenticationError: null,
  currentUser: null,
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
  }
});

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {

    case AUTHENTICATE: {
      return state.merge({
        authenticating: true,
        fetchingCurrentUser: true,
        fetchedCurrentUser: false
      });
    }

    case AUTHENTICATE_ERROR: {
      return state.merge({
        authenticating: false,
        authenticationError: action.data.errorMessage,
        fetchingCurrentUser: false,
        fetchedCurrentUser: false
      });
    }

    case AUTHENTICATE_SUCCESS: {
      return state.merge({
        authenticating: false,
        currentUser: action.data.user,
        fetchingCurrentUser: false,
        fetchedCurrentUser: true
      });
    }

    case UPDATE_EMAIL: {
      return state.updateIn(['form', 'email'], (email) => email.merge(action.data));
    }

    case UPDATE_PASSWORD: {
      return state.updateIn(['form', 'password'], (email) => email.merge(action.data));
    }

    default: {
      return state;
    }

  }
}
