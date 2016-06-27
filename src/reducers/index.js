import {combineReducers} from 'redux';
import app from './AppReducer';
import auth from './AuthReducer';
import onboarding from './OnboardingReducer';
import locationFetching from './LocationFetchingReducer';
import messagesFetching from './MessagesFetchingReducer';
import messages from './MessagesReducer';

export default combineReducers({
  app,
  auth,
  onboarding,
  locationFetching,
  messagesFetching,
  messages
});
