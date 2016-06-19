import {AUTHENTICATE_SUCCESS} from '../action_types/AuthActionTypes';
import {
  UPDATE_NAME
} from '../action_types/OnboardingActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  form: {
    name: {
      value: '',
      error: null
    }
  }
});

export default function OnboardingReducer(state = initialState, action) {
  switch (action.type) {

    // When the user successfully authenticates, if they have not yet been onboarded,
    // we want to hydrate the state with their information
    case AUTHENTICATE_SUCCESS: {
      const {user} = action.data;
      // If they're already onboarded, we won't bother hydrating the onboarding state as
      // it will never be used
      if (user.onboarded) return state;

      return state.setIn(['form', 'name', 'value'], user.fullName);
    }

    case UPDATE_NAME: {
      return state.updateIn(['form', 'name'], (name) => name.merge(action.data));
    }

    default: {
      return state;
    }

  }
}
