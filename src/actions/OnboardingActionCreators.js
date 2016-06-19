import {
  UPDATE_NAME,
  WRITE_NAME,
  WRITE_NAME_ERROR,
  WRITE_NAME_SUCCESS
} from '../action_types/OnboardingActionTypes';

const OnboardingActionCreators = {

  updateName(name) {
    return {
      type: UPDATE_NAME,
      data: {value: name, error: null}
    };
  },

  writeName() {
    return {
      type: WRITE_NAME
    };
  },

  writeNameError(message) {
    return {
      type: WRITE_NAME_ERROR,
      data: {error: message}
    };
  },

  writeNameSuccess(user) {
    return {
      type: WRITE_NAME_SUCCESS,
      data: {user}
    };
  }

};

export default OnboardingActionCreators;
