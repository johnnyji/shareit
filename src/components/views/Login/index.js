import React, {
  Component,
  PropTypes,
  Text,
  View
} from 'react-native';
import AuthActionCreators from '../../../actions/AuthActionCreators';
import baseStyles from '../../../styles/baseStyles';
import Button from '../../ui/Button';
import ColorScheme from '../../../styles/ColorScheme';
import CustomPropTypes from '../../utils/CustomPropTypes';
import getResponseErrors from '../../../utils/http/getResponseErrors';
import Input from '../../ui/Input';
import StatusBarEscape from '../../ui/StatusBarEscape';
import Toolbar from '../../ui/Toolbar';
import pureRender from 'pure-render-decorator';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

@connect((state) => ({
  authenticating: state.auth.get('authenticating'),
  currentUser: state.app.get('currentUser'),
  email: state.auth.getIn(['form', 'email', 'value']),
  emailError: state.auth.getIn(['form', 'email', 'error']),
  password: state.auth.getIn(['form', 'password', 'value']),
  passwordError: state.auth.getIn(['form', 'password', 'error'])
}))
@pureRender
export default class Login extends Component {

  static displayName = 'Login';

  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
    currentUser: CustomPropTypes.user,
    dispatch: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    emailError: PropTypes.string,
    password: PropTypes.string.isRequired,
    passwordError: PropTypes.string
  };

  static contextTypes = {
    app: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const {currentUser} = nextProps;

    if (!this.props.currentUser && currentUser) {
      // If the user has not been onboarded fully,
      // we need to step them through the unboarding screen
      if (!currentUser.get('onboarded')) {
        Actions.Onboarding();
        return;
      }

      // Otherwise if the user has already been onboarded, we
      // just follow the regular flow
      Actions.Messages();
    }
  }

  render() {
    return (
      <View style={baseStyles.fullWidth}>
        <StatusBarEscape />

        <Toolbar onBackNavClick={Actions.pop}>
          <Text style={[baseStyles.subheader, baseStyles.centerText]}>Login</Text>
        </Toolbar>

        <View style={[baseStyles.stretchCrossAxis, {flex: 8}]}>
          <Input
            borderBottomColor={ColorScheme.borderGray}
            onUpdate={this._handleUpdateEmail}
            placeholder='Email'
            placeholderTextColor={ColorScheme.placeholder}
            style={{height: 60}}
            value={this.props.email} />
          <Input
            borderBottomColor={ColorScheme.borderGray}
            onUpdate={this._handleUpdatePassword}
            placeholder='Password'
            placeholderTextColor={ColorScheme.placeholder}
            style={{height: 60}}
            type='password'
            value={this.props.password} />
        </View>

        <Button
          label='Login'
          onClick={this._handleLogin}
          style={baseStyles.centerChildren} />
      </View>
    );
  }

  /**
   * Handles clicking the login button and beginning
   * the authentication process
   */
  _handleLogin = () => {
    const {dispatch, email, password} = this.props;

    this.context.app.authenticate({
      type: 'local',
      email: email.toLowerCase().trim(),
      password
    })
      .then((response) => {
        dispatch(AuthActionCreators.authenticateSuccess(response));
      })
      .catch((err) => {
        const firstError = getResponseErrors(err)[0];
        dispatch(AuthActionCreators.authenticateError(firstError));
      });
  };
  
  _handleUpdateEmail = (value) => {
    this.props.dispatch(AuthActionCreators.updateEmail(value));
  };

  _handleUpdatePassword = (value) => {
    this.props.dispatch(AuthActionCreators.updatePassword(value));
  };

  // _handleInstagramLoginPress = () => {
  //   const instagramUrl = 
  //     `${instagram.api.path}/oauth/authorize/` +
  //     `?client_id=${instagram.clientId}` +
  //     `&redirect_uri=${instagram.redirectUri}` +
  //     `&response_type=code`;
  //   console.log(instagramUrl);
  //   
  //   // Linking.canOpenUrl(instagramUrl)
  //   //   .then((supported) => {
  //   //     if (!supported) {
  //   //       debugger;
  //   //     } else {
  //   //       debugger;
  //   //       Linking.openUrl(instagramUrl);
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     debugger;
  //   //     if (__DEV__) {
  //   //       console.log('Auth failed alert hit');
  //   //     }
  //   //     this.props.dispatch(setAlert({
  //   //       title: 'Oops, Authentication Error',
  //   //       message: 'Unable to connect to Instagram'
  //   //     }));
  //   //   });
  //   Linking.openURL(
  //     `${instagram.api.path}/oauth/authorize/` +
  //     `?client_id=${instagram.clientId}` +
  //     `&redirect_uri=${instagram.redirectUri}` +
  //     `&response_type=code`
  //   ).catch((err) => {
  //     if (__DEV__) {
  //       console.log(err);
  //     }
  //     this.props.dispatch(setAlert({
  //       title: 'Oops, Authentication Error',
  //       message: 'Unable to connect to Instagram'
  //     }));
  //   });
  // }

  // _handleUrl = (event) => {
  //   const error = getParameterByName(event.url, 'error');
  //   const errorReason = getParameterByName(event.url, 'error_reason');
  //   const code = getParameterByName(event.url, 'code');

  //   if (code) this.props.dispatch(loginWithInstagram(code));

  //   // Alerts the user of a login failure
  //   if (error && errorReason) {
  //     this.props.dispatch(setAlert({
  //       title: 'Unable to Login',
  //       message: errorReason
  //     }));
  //   }
  // }

}
