import createConstants from './utils/createConstants';

const AuthActionTypes = createConstants([
  'AUTHENTICATE',
  'AUTHENTICATE_ERROR',
  'AUTHENTICATE_SUCCESS',
  'UPDATE_EMAIL',
  'UPDATE_PASSWORD'
]);

export default AuthActionTypes;
