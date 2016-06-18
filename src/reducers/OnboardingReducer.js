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

    case UPDATE_NAME: {
      return state.updateIn(['form', 'name'], (name) => name.merge(action.data));
    }

    default: {
      return state;
    }

  }
}
