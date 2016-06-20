import {
  FETCH_LOCATION,
  FETCH_LOCATION_ERROR,
  FETCH_LOCATION_SUCCESS
} from '../action_types/LocationFetchingActionTypes';
import createReducer from './utils/createReducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  fetching: false,
  fetched: false,
  fetchError: null
});

export default createReducer(initialState, {
  name: 'LocationFetching',
  
  handlers: {
    onFetching: [FETCH_LOCATION],
    onFetched: [FETCH_LOCATION_SUCCESS],
    onFetchError: [FETCH_LOCATION_ERROR]
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
      fetched: false,
      fetchError: error
    });
  }

});
