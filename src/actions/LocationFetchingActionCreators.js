import {
  FETCH_LOCATION,
  FETCH_LOCATION_ERROR,
  FETCH_LOCATION_SUCCESS
} from '../action_types/LocationFetchingActionTypes';

const LocationFetchingActionCreators = {

  fetch() {
    return {
      type: FETCH_LOCATION
    };
  },

  fetchError(message) {
    return {
      type: FETCH_LOCATION_ERROR,
      data: {error: message}
    };
  },

  fetchSuccess(updatedUser) {
    return {
      type: FETCH_LOCATION_SUCCESS,
      data: {user: updatedUser}
    };
  }

};

export default LocationFetchingActionCreators;
