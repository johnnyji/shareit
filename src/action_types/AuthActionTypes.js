import createConstants from './utils/createConstants';

const AuthActionTypes = createConstants([
  'AUTHENTICATE',
  'AUTHENTICATE_ERROR',
  'AUTHENTICATE_SUCCESS',
]);

export default AuthActionTypes;
