import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import ColorScheme from '../../styles/ColorScheme';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {
    borderBottomColor: ColorScheme.borderGray,
    borderBottomWidth: 1,
    height: 40,
    padding: 8
  }
});

@pureRender
export default class Toolbar extends Component {
  
  static displayName = 'Toolbar';

  static propTypes = {
    style: CustomPropTypes.style
  };

  render() {
    const {children, style} = this.props;

    return (
      <View style={[
        styles.main,
        baseStyles.center,
        style && style
      ]}>
        {children}
      </View>
    );
  }
}

