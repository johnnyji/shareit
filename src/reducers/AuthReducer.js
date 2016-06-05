import {
  AUTHENTICATE,
  AUTHENTICATE_ERROR,
  AUTHENTICATE_SUCCESS
} from '../action_types/AuthActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  authenticating: false,
  authenticationError: null,
  currentUser: null
});

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {

    case AUTHENTICATE: {
      return state.set('authenticating', true);
    }

    case AUTHENTICATE_ERROR: {
      return state.merge({
        authenticating: false,
        authenticationError: action.data.errorMessage
      });
    }

    case AUTHENTICATE_SUCCESS: {
      return state.merge({
        authenticating: false,
        currentUser: action.data.user
      });
    }

    default: {
      return state;
    }

  }
}
