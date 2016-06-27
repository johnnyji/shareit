import React, {
  Component,
  ListView,
  PropTypes,
  StyleSheet,
  View
} from 'react-native';
import CustomPropTypes from '../../utils/CustomPropTypes';
import InvertibleScroll from 'react-native-invertible-scroll-view';
import MessageRow from './MessageRow';

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'blue',
    flex: 1
  },
  messagesList: {
    backgroundColor: 'red',
    flex: 1
  },
  messagesInput: {
  }
});

export default class MessagesContainer extends Component {
  
  static displayName = 'MessagesContainer';

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    messagesListViewData: PropTypes.instanceOf(ListView.DataSource).isRequired
  };

  render() {
    const {messagesListViewData} = this.props;

    return (
      <View style={styles.main}>
        <ListView
          dataSource={messagesListViewData}
          renderRow={this._renderMessage}
          renderScrollComponent={this._renderInvertibleScroll}
          style={styles.messagesList} />
      </View>
    );
  }

  _renderInvertibleScroll = (props) => {
    return <InvertibleScroll {...props} inverted={true} />;
  };

  _renderMessage = (message) => {
    return (
      <MessageRow
        currentUser={this.props.currentUser}
        message={message} />
    );
  };

}
