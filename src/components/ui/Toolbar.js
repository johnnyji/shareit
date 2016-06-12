import React, {
  Component,
  PropTypes,
  StyleSheet,
  View
} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import ColorScheme from '../../styles/ColorScheme';

const styles = StyleSheet.create({
  main: {
    borderBottomColor: ColorScheme.borderGray,
    borderBottomWidth: 1,
    height: 40
  }
});

export default class Toolbar extends Component {
  
  static displayName = 'Toolbar';

  static propTypes = {
    style: PropTypes.object
  };

  render() {
    const {children} = this.props;

    return (
      <View style={[
        styles.main,
        baseStyles.center,
        baseStyles.escapeStatusBarIOS
      ]}>
        {children}
      </View>
    );
  }
}

