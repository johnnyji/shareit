import React, {
  Component,
  PropTypes,
  StyleSheet,
  TextInput
} from 'react-native';
import inputStyles from '../../styles/ui/Input';
import pureRender from 'pure-render-decorator';

@pureRender
export default class Input extends Component {
  
  static displayName = 'Input';

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    style: PropTypes.instanceOf(StyleSheet),
    value: PropTypes.string.isRequired
  };

  static defaultProps = {
    value: ''
  };

  render() {
    const {style, value} = this.props;

    return (
      <TextInput
        onChangeText={this._handleChangeText}
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

