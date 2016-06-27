import createConstants from './utils/createConstants';

const MessagesActionTypes = createConstants([
  'FETCH_MESSAGES',
  'FETCH_MESSAGES_ERROR',
  'FETCH_MESSAGES_SUCCESS'
]);

export default MessagesActionTypes;
