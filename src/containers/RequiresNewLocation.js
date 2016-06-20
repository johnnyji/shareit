import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import baseStyles from '../styles/baseStyles';
import {connect} from 'react-redux';
import ColorScheme from '../styles/ColorScheme';
import CustomPropTypes from '../components/utils/CustomPropTypes';
import FullPageError from '../components/ui/FullPageError';
import Icon from 'react-native-vector-icons/Ionicons';
import LocationFetchingActionCreators from '../actions/LocationFetchingActionCreators';

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  fetchingIcon: {
    color: ColorScheme.primaryLight
  },
  fetchingText: {
    marginTop: 20
  }
});

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

      if (this.props.fetchError) {
        return <FullPageError error={this.props.fetchError} />;
      }

      if (!this.props.fetched) {
        return (
          <View style={[styles.main, baseStyles.stretchCrossAxis]}>
            <View style={{flex: 2}} />

            <View style={[{flex: 5}, baseStyles.centerChildren]}>
              <Icon
                name='ios-navigate'
                size={60}
                style={styles.fetchingIcon} />
              <Text style={[styles.fetchingText, baseStyles.subheader]}>Finding you...</Text>
            </View>

            <View style={{flex: 7}} />
          </View>
        );
      }

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
