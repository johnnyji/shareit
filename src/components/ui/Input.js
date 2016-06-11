import React, {
  Component,
  PropTypes,
  TextInput
} from 'react-native';
import inputStyles from '../../styles/ui/Input';
import pureRender from 'pure-render-decorator';
import {white} from '../../styles/ColorScheme';

@pureRender
export default class Input extends Component {
  
  static displayName = 'Input';

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    placeholderTextColor: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    placeholderTextColor: white,
    value: ''
  };

  render() {
    const {
      placeholder,
      placeholderTextColor,
      style,
      value
    } = this.props;

    return (
      <TextInput
        onChangeText={this._handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        style={[
          inputStyles.main,
          style && style
        ]} />
    );
  }

  _handleChangeText = (text) => {
    this.props.onUpdate(text);
  };
}

