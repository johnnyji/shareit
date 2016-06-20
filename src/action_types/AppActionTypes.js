import createConstants from './utils/createConstants';

const AppActionTypes = createConstants([
  'ON_CONNECTING',
  'ON_CONNECTED',
  'ON_DISCONNECT',
  'SET_ALERT'
]);

export default AppActionTypes;
