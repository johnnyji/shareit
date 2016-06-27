import React, {
  Component,
  PropTypes,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import ColorScheme from '../../styles/ColorScheme';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent',
    color: ColorScheme.text,
    flex: 1,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6
  }
});

@pureRender
export default class Input extends Component {
  
  static displayName = 'Input';

  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    borderColor: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    placeholderTextColor: PropTypes.string.isRequired,
    showBorderBottom: PropTypes.bool.isRequired,
    showBorderTop: PropTypes.bool.isRequired,
    style: CustomPropTypes.style,
    type: PropTypes.oneOf(['text', 'password']).isRequired,
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    autoFocus: false,
    borderColor: ColorScheme.borderGray,
    borderWidth: 1,
    height: 45,
    placeholderTextColor: ColorScheme.placeholder,
    showBorderBottom: true,
    showBorderTop: false,
    type: 'text',
    value: ''
  };

  render() {
    const {
      autoFocus,
      borderColor,
      borderWidth,
      height,
      placeholder,
      placeholderTextColor,
      showBorderBottom,
      showBorderTop,
      style,
      type,
      value
    } = this.props;

    return (
      <View style={[
        {height},
        showBorderTop && {
          borderTopColor: borderColor,
          borderTopWidth: borderWidth
        },
        showBorderBottom && {
          borderBottomColor: borderColor,
          borderBottomWidth: borderWidth
        }
      ]}>
        <TextInput
          autoFocus={autoFocus}
          onChangeText={this._handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          secureTextEntry={type === 'password'}
          style={[
            styles.main,
            style && style
          ]} />
      </View>
    );
  }

  _handleChangeText = (text) => {
    this.props.onUpdate(text);
  };
}

