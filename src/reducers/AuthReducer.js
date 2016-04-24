import AuthActionTypes from '../action_types/AuthActionTypes';
import Immutable from 'immutable';

const {
  LOGIN_WITH_INSTAGRAM,
  LOGIN_WITH_INSTAGRAM_SUCCESS
} = AuthActionTypes;

const initialState = Immutable.fromJS({
  authenticating: false,
  currentUser: null
});

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_WITH_INSTAGRAM: {
      return state.set('authenticating', true);
    }
    case LOGIN_WITH_INSTAGRAM_SUCCESS: {
      return state;
    }
    default: {
      return state;
    }
  }
}
