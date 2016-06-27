import React, {
  Component,
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import baseStyles from '../../../styles/baseStyles';
import ColorScheme from '../../../styles/ColorScheme';
import Clickable from '../../ui/Clickable';
import CustomPropTypes from '../../utils/CustomPropTypes';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../ui/Input';
import InvertibleScroll from 'react-native-invertible-scroll-view';
import MessageRow from './MessageRow';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  messagesList: {
    flex: 1
  },
  messagesInput: {
  },
  noMessagesText: {
    color: ColorScheme.disabledText,
    textAlign: 'center'
  },
  sendMessageIcon: {
    color: ColorScheme.primary
  }
});

@pureRender
export default class MessagesContainer extends Component {
  
  static displayName = 'MessagesContainer';

  static contextTypes = {
    app: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    messages: ImmutablePropTypes.list.isRequired,
    messagesListViewData: PropTypes.instanceOf(ListView.DataSource).isRequired
  };

  state = {
    currentMessage: ''
  };

  componentDidMount() {
    this.context.app.service('messages').on('created', this._handleNewMessage);
  }

  render() {
    return (
      <View style={styles.main}>
        {this._renderListView()}
        <Input
          height={60}
          onUpdate={this._handleUpdate}
          placeholder='Start typing...'
          rightSideContent={this._renderInputSubmitButton()}
          showBorderBottom={false}
          showBorderTop={true}
          value={this.state.currentMessage} />
      </View>
    );
  }

  _renderInputSubmitButton = () => {
    return (
      <Clickable onClick={this._handleSendMessage}>
        <Icon name='ios-send' size={32} style={styles.sendMessageIcon} />
      </Clickable>
    );
  };

  _renderInvertibleScroll = (props) => {
    return <InvertibleScroll {...props} inverted={true} />;
  };

  _renderListView = () => {
    if (!this.props.messages.size) {
      return (
        <View style={[baseStyles.centerChildren, styles.messagesList]}>
          <Text style={[baseStyles.subheader, styles.noMessagesText]}>
            Nothing yet... Why dont you start it!
          </Text>
        </View>
      );
    }

    return (
      <ListView
        dataSource={this.props.messagesListViewData}
        renderRow={this._renderMessage}
        renderScrollComponent={this._renderInvertibleScroll}
        style={styles.messagesList} />
    );
  };

  _renderMessage = (message) => {
    return (
      <MessageRow
        currentUser={this.props.currentUser}
        message={message} />
    );
  };

  _handleNewMessage = (message) => {
    debugger;
  };

  _handleSendMessage = () => {
    this.context.app
      .service('messages')
      .create({
        _creator: this.props.currentUser.get('_id'),
        body: this.state.currentMessage
      })
      .then(() => {
        this.setState({currentMessage: ''});
      })
      .catch();
  };
  
  _handleUpdate = (text) => {
    this.setState({currentMessage: text});
  };

}
