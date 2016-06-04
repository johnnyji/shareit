import createConstants from './utils/createConstants';

const AppActionTypes = createConstants([
  'ON_CONNECT',
  'ON_DISCONNECT',
  'SET_ALERT',
  'SET_LOADING'
]);

export default AppActionTypes;
