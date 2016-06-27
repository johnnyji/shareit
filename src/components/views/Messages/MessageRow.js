import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {}
});

@pureRender
export default class MessageRow extends Component {
  
  static displayName = 'MessageRow';
  
  static propTypes = {
    message: ImmutablePropTypes.mapContains({
      body: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const {message} = this.props;

    return (
      <View style={styles.main}>
        <Text>{message.get('body')}</Text>
      </View>
    );
  }
}

