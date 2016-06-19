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
import CustomPropTypes from '../../utils/CustomPropTypes';
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

export default class PickUsername extends Component {
  
  static displayName = 'PickUsername';

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    username: PropTypes.string.isRequired,
    usernameError: PropTypes.string
  };

  static contextTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const {username, usernameError} = this.props;
    const isValidUsername = username.length > 0 && !usernameError;

    return (
      <View style={[styles.main, baseStyles.stretchCrossAxis]}>
        <View style={{flex: 2}} />

        <View style={[{flex: 5}, baseStyles.centerChildren, baseStyles.stretchCrossAxis]}>
          <Text style={[styles.font, baseStyles.centerText]}>
            What about your username?
          </Text>
          <Input
            autoFocus={true}
            height={100}
            onUpdate={this._handleUpdateUsername}
            placeholder="Your username"
            showBorderBottom={false}
            style={[
              styles.font,
              styles.input,
              baseStyles.centerText
            ]}
            value={username} />
          <View style={styles.nextStepLinkWrapper}>
            {isValidUsername &&
              <Clickable onClick={this._handleNextStep} style={[baseStyles.row, baseStyles.center]}>
                <Text style={styles.nextStepLink}>Awesome {username}, now go chat!</Text>
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
    const {currentUser, username} = this.props;
    const {app, dispatch} = this.context;
    
    dispatch(OnboardingActionCreators.writeName());

    app
      .service('users')
      .patch(currentUser.get('_id'), {username})
      .then((user) => {
        dispatch(OnboardingActionCreators.writeUsernameSuccess(user));
      })
      .catch(({message}) => {
        dispatch(OnboardingActionCreators.writeUsernameError(message));
      });
  };

  _handleUpdateUsername = (username) => {
    this.context.dispatch(OnboardingActionCreators.updateUsername(username));
  };

}

