import React, {
  Component,
  PropTypes,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import baseStyles from '../../styles/baseStyles';
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
    style: PropTypes.object
  };

  static propTypes = {
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
          baseStyles.center,
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

