import createConstants from './utils/createConstants';

const OnboardingActionTypes = createConstants([
  'UPDATE_NAME',
  'UPDATE_USERNAME',
  'WRITE_NAME',
  'WRITE_NAME_ERROR',
  'WRITE_NAME_SUCCESS',
  'WRITE_USERNAME',
  'WRITE_USERNAME_ERROR',
  'WRITE_USERNAME_SUCCESS'
]);

export default OnboardingActionTypes;
