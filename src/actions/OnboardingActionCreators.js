import {
  UPDATE_NAME,
  UPDATE_USERNAME,
  WRITE_NAME,
  WRITE_NAME_ERROR,
  WRITE_NAME_SUCCESS,
  WRITE_USERNAME,
  WRITE_USERNAME_ERROR,
  WRITE_USERNAME_SUCCESS
} from '../action_types/OnboardingActionTypes';

const OnboardingActionCreators = {

  updateName(name) {
    return {
      type: UPDATE_NAME,
      data: {value: name, error: null}
    };
  },

  updateUsername(username) {
    return {
      type: UPDATE_USERNAME,
      data: {value: username, error: null}
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
  },

  writeUsername() {
    return {
      type: WRITE_USERNAME
    };
  },

  writeUsernameError(message) {
    return {
      type: WRITE_USERNAME_ERROR,
      data: {error: message}
    };
  },

  writeUsernameSuccess(user) {
    return {
      type: WRITE_USERNAME_SUCCESS,
      data: {user}
    };
  }


};

export default OnboardingActionCreators;
