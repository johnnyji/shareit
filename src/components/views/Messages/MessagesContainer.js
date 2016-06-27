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
import CustomPropTypes from '../../utils/CustomPropTypes';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from '../../ui/Input';
import InvertibleScroll from 'react-native-invertible-scroll-view';
import MessageRow from './MessageRow';

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
  }
});

export default class MessagesContainer extends Component {
  
  static displayName = 'MessagesContainer';

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    messages: ImmutablePropTypes.list.isRequired,
    messagesListViewData: PropTypes.instanceOf(ListView.DataSource).isRequired
  };

  state = {
    currentMessage: ''
  };

  render() {
    return (
      <View style={styles.main}>
        {this._renderListView()}
        <Input
          height={60}
          onUpdate={this._handleUpdate}
          placeholder='Start typing...'
          showBorderBottom={false}
          showBorderTop={true}
          value={this.state.currentMessage} />
      </View>
    );
  }

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
  
  _handleUpdate = (text) => {
    this.setState({currentMessage: text});
  };

}
