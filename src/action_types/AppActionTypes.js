import createConstants from './utils/createConstants';

const AppActionTypes = createConstants([
  'ON_CONNECT',
  'ON_DISCONNECT',
  'SET_ALERT'
]);

export default AppActionTypes;
