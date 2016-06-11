import React, {
  Component,
  PropTypes,
  Text,
  TouchableOpacity
} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import buttonStyles from '../../styles/ui/Button';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Button extends Component {
  
  static displayName = 'Button';

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object,
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
          buttonStyles.main,
          baseStyles.center,
          fullWidth && baseStyles.fullWidth,
          disabled && buttonStyles.disabled,
          style && style
        ]}>
        <Text style={[
          buttonStyles.text,
          disabled && buttonStyles.disabledText,
          textStyle && textStyle
        ]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  _handlePress = () => {
    this.props.onClick();
  };

}

