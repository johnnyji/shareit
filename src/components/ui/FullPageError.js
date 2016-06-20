import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export default class FullPageSpinner extends Component {
  
  static displayName = 'FullPageSpinner';

  static propTypes = {
    error: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.main}>
        <Icon name='ion-beer' size={40} />
        <Text>{this.props.error}</Text>
      </View>
    );
  }
}

