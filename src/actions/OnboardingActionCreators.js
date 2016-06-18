import {
  UPDATE_NAME
} from '../action_types/OnboardingActionTypes';

const OnboardingActionCreators = {

  updateName(name) {
    return {
      type: UPDATE_NAME,
      data: {value: name, error: null}
    };
  }

};

export default OnboardingActionCreators;
