import React, {
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import CustomPropTypes from '../components/utils/CustomPropTypes';
import FullPageError from '../components/ui/FullPageError';
import FullPageSpinner from '../components/ui/FullPageSpinner';
import LocationFetchingActionCreators from '../actions/LocationFetchingActionCreators';

export default (ComposedComponent) => {

  class RequiresNewLocation extends Component {
    static displayName = 'RequiresNewLocation';

    static propTypes = {
      currentUser: CustomPropTypes.user.isRequired,
      dispatch: PropTypes.func.isRequired,
      fetchError: PropTypes.string,
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired
    };

    static contextTypes = {
      app: PropTypes.object.isRequired
    };

    componentDidMount() {
      const {dispatch, fetching, fetched} = this.props;

      if (!fetching && !fetched) {
        dispatch(LocationFetchingActionCreators.fetch());

        navigator.geolocation.getCurrentPosition(
          this._handleLocation,
          this._handleLocationError,
          {timeout: 20000, maximumAge: 1000}
        );
      }
    }

    render() {
      const {fetching, fetched, fetchError, ...restProps} = this.props;

      if (fetched && fetchError) return <FullPageError error={fetchError} />;
      if (fetching) return <FullPageSpinner />;

      return <ComposedComponent {...restProps} />;
    }

    _handleLocation = ({coords}) => {
      const {currentUser, dispatch} = this.props;

      // Updates the user's latitude and longitude
      this.context.app
        .service('users')
        .patch(currentUser.get('_id'), {
          location: {
            lat: coords.latitude,
            lon: coords.longitude
          }
        })
        .then((user) => {
          dispatch(LocationFetchingActionCreators.fetchSuccess(user));
        })
        .catch((err) => {
          dispatch(LocationFetchingActionCreators.fetchError(err.message));
        });
    };

    _handleLocationError = () => {
      this.props.dispatch(
        LocationFetchingActionCreators.fetchError('Sorry, we couldnt grab your location...')
      );
    };

  }

  return connect((state) => ({
    fetchError: state.locationFetching.get('fetchError'),
    fetched: state.locationFetching.get('fetched'),
    fetching: state.locationFetching.get('fetching')
  }))(RequiresNewLocation);

};
