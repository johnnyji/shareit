import createConstants from './utils/createConstants';

const LocationFetchingActionTypes = createConstants([
  'FETCH_LOCATION',
  'FETCH_LOCATION_ERROR',
  'FETCH_LOCATION_SUCCESS'
]);

export default LocationFetchingActionTypes;
