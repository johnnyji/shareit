import React, {
  Component,
  PropTypes,
  StyleSheet,
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
    style: PropTypes.instanceOf(StyleSheet)
  };

  static defaultProps = {
    disabled: false,
    fullWidth: true
  };

  render() {
    const {fullWidth, label, style} = this.props;

    return (
      <TouchableOpacity
        accessible={false}
        onPress={this._handlePress}
        style={[
          buttonStyles.main,
          baseStyles.center,
          fullWidth && baseStyles.fullWidth,
          style && style
        ]}>
        <Text style={buttonStyles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }

  _handlePress = () => {
    this.props.onClick();
  };

}

