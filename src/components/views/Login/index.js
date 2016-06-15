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
import Input from '../../ui/Input';
import StatusBarEscape from '../../ui/StatusBarEscape';
import Toolbar from '../../ui/Toolbar';
import pureRender from 'pure-render-decorator';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

@connect((state) => ({
  authenticating: state.auth.get('authenticating'),
  currentUser: state.auth.get('currentUser'),
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

  componentWillUpdate(nextProps) {
    if (!this.props.currentUser && nextProps.currentUser) {
      Actions.Home();
    }
  }

  render() {
    console.log(this.props.currentUser); 
    return (
      <View style={baseStyles.fullWidth}>
        <StatusBarEscape />

        <Toolbar onBackNavClick={Actions.pop}>
          <Text style={[baseStyles.subheader, baseStyles.centerText]}>Login</Text>
        </Toolbar>

        <View style={[baseStyles.stretch, {flex: 8}]}>
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
          style={baseStyles.center} />

      </View>
    );
  }

  /**
   * Handles clicking the login button and beginning
   * the authentication process
   */
  _handleLogin = () => {
    // TODO: Authentication is not working properly, correct password and email
    // is getting invalid message
    console.log(this.props.email, this.props.password);
    this.context.app.authenticate({
      type: 'local',
      email: this.props.email,
      password: this.props.password
    })
      .then(AuthActionCreators.authenticateSuccess)
      .catch(AuthActionCreators.authenticateError);
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