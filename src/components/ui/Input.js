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
    flex: 1
  },
  container: {
    flexDirection: 'row',
    padding: 8,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6
  },
  rightSideContent: {
    padding: 2
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
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    placeholderTextColor: PropTypes.string.isRequired,
    returnKeyType: PropTypes.oneOf([
      'done', 'go', 'next', 'search', 'send', 'none', 'previous',
      'default', 'emergency-call', 'google', 'join', 'route', 'yahoo'
    ]).isRequired,
    rightSideContent: PropTypes.node,
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
    returnKeyType: 'default',
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
      onSubmit,
      placeholder,
      placeholderTextColor,
      returnKeyType,
      rightSideContent,
      showBorderBottom,
      showBorderTop,
      style,
      type,
      value
    } = this.props;

    return (
      <View style={[
        styles.container,
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
          onSubmitEditing={onSubmit || null}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          returnKeyType={returnKeyType}
          secureTextEntry={type === 'password'}
          style={[
            styles.main,
            style && style
          ]} />
          {rightSideContent &&
            React.cloneElement(rightSideContent, {
              style: [rightSideContent.props.style, styles.rightSideContent]
            })
          }
      </View>
    );
  }

  _handleChangeText = (text) => {
    this.props.onUpdate(text);
  };
}

