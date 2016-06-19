import {AUTHENTICATE_SUCCESS} from '../action_types/AuthActionTypes';
import {
  UPDATE_NAME,
  UPDATE_USERNAME
} from '../action_types/OnboardingActionTypes';
import createReducer from './utils/createReducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  form: {
    name: {
      value: '',
      error: null
    },
    username: {
      value: '',
      error: null
    }
  }
});

export default createReducer(initialState, {
  name: 'Onboarding',
  
  handlers: {
    onCurrentUser: [AUTHENTICATE_SUCCESS],
    onUpdateName: [UPDATE_NAME],
    onUpdateUsername: [UPDATE_USERNAME]
  },

  /**
   * When the current user is either fetched or authenticated,
   * we want to see if they've been onboarded, if not we set their info
   * into the onboarding state
   * @param {Immutable.Map} state - The previous onboarding state
   * @param {Object} options - The action data
   * @param {Object} options.user - The current user
   * @returns {Immutable.Map} - The onboarding state
   */
  onCurrentUser(state, {user}) {
    // If they're already onboarded, we won't bother hydrating the onboarding state as
    // it will never be used
    if (user.onboarded) return state;

    return state.setIn(['form', 'name', 'value'], user.fullName);
  },

  onUpdateName(state, data) {
    return state.updateIn(['form', 'name'], (name) => name.merge(data));
  },

  onUpdateUsername(state, data) {
    return state.updateIn(['form', 'username'], (username) => username.merge(data));
  }

});
