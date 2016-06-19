import React, {
  Component,
  PropTypes,
  StyleSheet,
  View
} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import Clickable from './Clickable';
import ColorScheme from '../../styles/ColorScheme';
import CustomPropTypes from '../utils/CustomPropTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {
    borderBottomColor: ColorScheme.borderGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 45,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    paddingTop: 4
  },
  icon: {
    flex: 1
  },
  mainContent: {
    flex: 10
  }
});

@pureRender
export default class Toolbar extends Component {
  
  static displayName = 'Toolbar';

  static propTypes = {
    onBackNavClick: PropTypes.func,
    style: CustomPropTypes.style
  };

  render() {
    const {
      children,
      onBackNavClick,
      style
    } = this.props;

    return (
      <View style={[
        styles.main,
        baseStyles.centerChildren,
        style && style
      ]}>
        {onBackNavClick && this._renderBackNavButton()}
        <View style={styles.mainContent}>{children}</View>
        {onBackNavClick && <View style={styles.icon} />}
      </View>
    );
  }

  _renderBackNavButton = () => {
    return (
      <View style={styles.icon}>
        <Clickable onClick={this.props.onBackNavClick}>
          <Icon name='ios-arrow-back' size={24} />
        </Clickable>
      </View>
    );
  };

}

