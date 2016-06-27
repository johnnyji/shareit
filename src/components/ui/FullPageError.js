import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import ColorScheme from '../../styles/ColorScheme';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: ColorScheme.primary,
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    color: ColorScheme.white
  },
  text: {
    color: ColorScheme.white,
    fontWeight: '500',
    marginTop: 8
  }
});

export default class FullPageError extends Component {
  
  static displayName = 'FullPageError';

  static propTypes = {
    error: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.main}>
        <Icon
          name='ios-beer'
          size={50}
          style={styles.icon} />
        <Text style={[baseStyles.subheader, styles.text]}>
          {this.props.error}
        </Text>
      </View>
    );
  }
}

