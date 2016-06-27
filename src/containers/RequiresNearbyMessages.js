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
      fetchedMessages: PropTypes.bool.isRequired,
      fetchingMessages: PropTypes.bool.isRequired,
      fetchMessagesError: PropTypes.bool,
      messages: ImmutablePropTypes.list,
      messagesListViewData: PropTypes.instanceOf(ListView.DataSource).isRequired
    };

    componentDidMount() {
      if (!this.props.fetchingMessages && !this.props.fetchedMessages) {
        this._fetchMessages();
      }
    }

    render() {
      const {
        fetchingMessages,
        fetchedMessages,
        fetchMessagesError,
        ...restProps
      } = this.props;

      if (fetchingMessages && !fetchedMessages) return <FullPageSpinner />;
      if (fetchedMessages && fetchMessagesError) return <FullPageError error={fetchMessagesError} />;
        
      return <ComposedComponent {...restProps} />;
    }
    
    _fetchMessages = () => {
      const {currentUser, dispatch} = this.props;

      this.context.app
        .service('messages')
        .find(withinDistance.miles(
          50,
          currentUser.getIn(['location', 'lat']),
          currentUser.getIn(['location', 'lon'])
        ))
        .then((response) => {
          dispatch(MessagesActionCreators.fetchSuccess(response));
        })
        .catch(({message}) => {
          dispatch(MessagesActionCreators.fetchError(message));
        });
    };

  }

  return connect((state) => ({
    fetchMessagesError: state.messagesFetching.get('fetchError'),
    fetchedMessages: state.messagesFetching.get('fetched'),
    fetchingMessages: state.messagesFetching.get('fetching'),
    messages: state.messages.get('messages'),
    messagesListViewData: state.messages.get('messagesListViewData')
  }))(RequiresNearbyMessages);

};
