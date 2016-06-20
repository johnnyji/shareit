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
      fetchError: PropTypes.string,
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired
    };

    state = {
      locationFetched: false
    };

    static contextTypes = {
      app: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
      if (!this.props.fetching && !this.props.fetched) {
        this.context.dispatch(LocationFetchingActionCreators.fetch());
      }
    }

    componentDidMount() {
      if (!this.props.fetched) {
        navigator.geolocation.getCurrentPosition(
          this._handleLocation,
          this._handleLocationError,
          {timeout: 20000, maximumAge: 1000}
        );
      }
    }

    render() {
      if (this.props.fetchError) return <FullPageError error={this.props.fetchError} />;

      if (!this.props.fetched) return <FullPageSpinner />;

      return <ComposedComponent {...this.props} />;
    }

    _handleLocation = ({coords}) => {
      const {app, dispatch} = this.context;
      const {currentUser} = this.props;

      // Updates the user's latitude and longitude
      app
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
      this.context.dispatch(
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
