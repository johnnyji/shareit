import {combineReducers} from 'redux';
import app from './AppReducer';
import auth from './AuthReducer';
import onboarding from './OnboardingReducer';

export default combineReducers({
  app,
  auth,
  onboarding
});
