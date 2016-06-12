import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import ColorScheme from '../../styles/ColorScheme';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {
    backgroundColor: ColorScheme.primary,
    flexDirection: 'row',
    padding: 12
  },
  disabled: {
    backgroundColor: ColorScheme.disabled
  },
  disabledText: {
    color: ColorScheme.disabledText
  },
  text: {
    color: ColorScheme.white,
    fontWeight: 'bold',
    fontSize: 18
  }
});

@pureRender
export default class Button extends Component {
  
  static displayName = 'Button';

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    style: CustomPropTypes.style,
    textStyle: PropTypes.object
  };

  static defaultProps = {
    disabled: false,
    fullWidth: true
  };

  render() {
    const {disabled, fullWidth, label, style, textStyle} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.7}
        onPress={disabled ? null : this._handlePress}
        style={[
          styles.main,
          baseStyles.center,
          fullWidth && baseStyles.fullWidth,
          disabled && styles.disabled,
          style && style
        ]}>
        <Text style={[
          styles.text,
          disabled && styles.disabledText,
          textStyle && textStyle
        ]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  _handlePress = () => {
    this.props.onClick();
  };

}

