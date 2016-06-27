import {
  FETCH_MESSAGES,
  FETCH_MESSAGES_ERROR,
  FETCH_MESSAGES_SUCCESS
} from '../action_types/MessagesActionTypes';
import createReducer from './utils/createReducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  fetching: false,
  fetched: false,
  fetchError: null
});

export default createReducer(initialState, {
  name: 'MessagesFetching',
  
  handlers: {
    onFetching: [FETCH_MESSAGES],
    onFetched: [FETCH_MESSAGES_SUCCESS],
    onFetchError: [FETCH_MESSAGES_ERROR]
  },

  onFetching(state) {
    return state.merge({
      fetching: true,
      fetched: false,
      fetchError: null
    });
  },

  onFetched(state) {
    return state.merge({
      fetching: false,
      fetched: true,
      fetchError: null
    });
  },

  onFetchError(state, {error}) {
    return state.merge({
      fetching: false,
      fetched: true,
      fetchError: error
    });
  }

});
