import {
  LOGIN_WITH_INSTAGRAM,
  LOGIN_WITH_INSTAGRAM_FAILURE,
  LOGIN_WITH_INSTAGRAM_SUCCESS
} from '../action_types/AuthActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  authenticating: false,
  authenticationError: null,
  currentUser: null
});

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_WITH_INSTAGRAM: {
      return state.set('authenticating', true);
    }
    case LOGIN_WITH_INSTAGRAM_FAILURE: {
      return state.merge({authenticating: false});
    }
    case LOGIN_WITH_INSTAGRAM_SUCCESS: {
      return state;
    }
    default: {
      return state;
    }
  }
}
