import {
  FETCH_MESSAGES,
  FETCH_MESSAGES_ERROR,
  FETCH_MESSAGES_SUCCESS
} from '../action_types/MessagesActionTypes';

const MessagesActionCreators = {

  fetch() {
    return {
      type: FETCH_MESSAGES
    };
  },

  fetchSuccess({data, skip}) {
    return {
      type: FETCH_MESSAGES_SUCCESS,
      data: {
        messages: data,
        offset: skip
      }
    };
  },

  fetchError({message}) {
    return {
      type: FETCH_MESSAGES_ERROR,
      data: {error: message}
    };
  }

};

export default MessagesActionCreators;
