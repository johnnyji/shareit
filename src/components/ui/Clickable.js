import React, {
  Component,
  PropTypes,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent'
  }
});

@pureRender
export default class Clickable extends Component {
  
  static displayName = 'Clickable';

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    style: CustomPropTypes.style
  };

  static defaultProps = {
    disabled: false
  };

  render() {
    const {children, disabled, style} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={disabled ? null : this._handlePress}
        style={[
          styles.main,
          baseStyles.centerChildren,
          style && style
        ]}>
        {children}
      </TouchableOpacity>
    );
  }

  _handlePress = () => {
    this.props.onClick();
  };

}

