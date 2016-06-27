import React, {
  Component,
  ListView,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import CustomPropTypes from '../components/utils/CustomPropTypes';
import FullPageError from '../components/ui/FullPageError';
import FullPageSpinner from '../components/ui/FullPageSpinner';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MessagesActionCreators from '../actions/MessagesActionCreators';
import withinDistance from '../utils/location/withinDistance';

export default (ComposedComponent) => {

  class RequiresNearbyMessages extends Component {

    static displayName = 'RequiresNearbyMessages';

    static contextTypes = {
      app: PropTypes.object.isRequired
    };

    static propTypes = {
      currentUser: CustomPropTypes.user.isRequired,
      dispatch: PropTypes.func.isRequired,
      fetchError: PropTypes.string,
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
      messages: ImmutablePropTypes.list,
      messagesListViewData: PropTypes.instanceOf(ListView.DataSource).isRequired
    };

    componentWillMount() {
      if (!this.props.fetching && !this.props.fetched) {
        this._fetchMessages();
      }
    }

    render() {
      const {
        fetching,
        fetched,
        fetchError,
        ...restProps
      } = this.props;

      if (fetchError) return <FullPageError error={fetchError} />;
      if (fetching || !fetched) return <FullPageSpinner />;
        
      return <ComposedComponent {...restProps} />;
    }
    
    _fetchMessages = () => {
      const {currentUser, dispatch} = this.props;
      const nearbyMessages = withinDistance.miles(
        50,
        currentUser.getIn(['location', 'lat']),
        currentUser.getIn(['location', 'lon'])
      );

      dispatch(MessagesActionCreators.fetch());

      this.context.app
        .service('messages')
        .find(nearbyMessages)
        .then((response) => {
          dispatch(MessagesActionCreators.fetchSuccess(response));
        })
        .catch((err) => {
          dispatch(MessagesActionCreators.fetchError(err.message));
        });
    };

  }

  return connect((state) => ({
    fetchError: state.messagesFetching.get('fetchError'),
    fetched: state.messagesFetching.get('fetched'),
    fetching: state.messagesFetching.get('fetching'),
    messages: state.messages.get('messages'),
    messagesListViewData: state.messages.get('messagesListViewData')
  }))(RequiresNearbyMessages);

};
