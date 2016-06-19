import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import baseStyles from '../../../styles/baseStyles';
import Clickable from '../../ui/Clickable';
import ColorScheme from '../../../styles/ColorScheme';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../ui/Input';
import OnboardingActionCreators from '../../../actions/OnboardingActionCreators';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  font: {
    fontSize: 32
  },
  input: {
    color: ColorScheme.primary,
    margin: 8
  },
  nextStepLinkWrapper: {
    height: 30
  },
  nextStepLink: {
    color: ColorScheme.grayLight,
    marginRight: 8
  },
  nextStepIcon: {
    color: ColorScheme.grayLight,
    top: 2
  }
});

export default class PickName extends Component {
  
  static displayName = 'PickName';

  static propTypes = {
    name: PropTypes.string.isRequired,
    nameError: PropTypes.string
  };

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const {name, nameError} = this.props;
    const isValidName = name.length > 0 && !nameError;

    return (
      <View style={[styles.main, baseStyles.stretchCrossAxis]}>
        <View style={{flex: 2}} />

        <View style={[{flex: 5}, baseStyles.centerChildren, baseStyles.stretchCrossAxis]}>
          <Text style={[styles.font, baseStyles.centerText]}>
            Hello,
          </Text>
          <Input
            autoFocus={true}
            height={100}
            onUpdate={this._handleUpdateName}
            placeholder="Your name"
            showBorderBottom={false}
            style={[
              styles.font,
              styles.input,
              baseStyles.centerText
            ]}
            value={name} />
          <View style={styles.nextStepLinkWrapper}>
            {isValidName &&
              <Clickable onClick={this._handleNextStep} style={[baseStyles.row, baseStyles.center]}>
                <Text style={styles.nextStepLink}>Yeah yeah, lets move on</Text>
                <Icon name='ios-arrow-forward' size={18} style={styles.nextStepIcon} />
              </Clickable>
            }
          </View>
        </View>

        <View style={{flex: 7}} />
      </View>
    );
  }

  _handleNextStep = () => {
  };

  _handleUpdateName = (name) => {
    this.context.dispatch(OnboardingActionCreators.updateName(name));
  };

}

