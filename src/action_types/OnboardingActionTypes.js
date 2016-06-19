import createConstants from './utils/createConstants';

const OnboardingActionTypes = createConstants([
  'UPDATE_NAME',
  'WRITE_NAME',
  'WRITE_NAME_ERROR',
  'WRITE_NAME_SUCCESS'
]);

export default OnboardingActionTypes;
