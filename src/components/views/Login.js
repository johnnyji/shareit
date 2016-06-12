import React, {
  Component,
  PropTypes,
  Text,
  View
} from 'react-native';
import AuthActionCreators from '../../actions/AuthActionCreators';
import baseStyles from '../../styles/baseStyles';
import Button from '../ui/Button';
import Clickable from '../ui/Clickable';
import ColorScheme from '../../styles/ColorScheme';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../ui/Input';
import Toolbar from '../ui/Toolbar';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

@connect((state) => ({
  authenticating: state.auth.get('authenticating'),
  email: state.auth.getIn(['form', 'email', 'value']),
  emailError: state.auth.getIn(['form', 'email', 'error']),
  password: state.auth.getIn(['form', 'password', 'value']),
  passwordError: state.auth.getIn(['form', 'password', 'error'])
}))
export default class Login extends Component {

  static displayName = 'Login';

  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    emailError: PropTypes.string,
    password: PropTypes.string.isRequired,
    passwordError: PropTypes.string
  };

  static contextTypes = {
    app: PropTypes.object.isRequired
  };

  render() {
    
    return (
      <View style={baseStyles.fullWidth}>
        <View style={baseStyles.escapeStatusBarIOS} />

        {/* TODO: Why is this having overflow? */}
        <Toolbar>
          <Clickable
            onClick={Actions.pop}
            style={[baseStyles.center, {alignSelf: 'flex-start'}]}>
            <Icon name='ios-arrow-back' size={30} />
          </Clickable>
          <Text style={baseStyles.subheader}>Login</Text>
        </Toolbar>

        <View style={[baseStyles.stretch, {flex: 1}]}>
          <Input
            borderBottomColor={ColorScheme.borderGray}
            onUpdate={this._handleUpdateEmail}
            placeholder='Email'
            placeholderTextColor={ColorScheme.placeholder}
            style={{height: 50}}
            value={this.props.email} />
          <Input
            borderBottomColor={ColorScheme.borderGray}
            onUpdate={this._handleUpdatePassword}
            placeholder='Password'
            placeholderTextColor={ColorScheme.placeholder}
            style={{height: 50}}
            type='password'
            value={this.props.password} />
        </View>

        <View style={[baseStyles.stretch, {justifyContent: 'flex-end', flex: 3}]}>
          <View style={{flex: 5}} />
          <Button
            label='Login'
            onClick={this._handleLogin} />
        </View>

      </View>
    );
  }

  /**
   * Handles clicking the login button and beginning
   * the authentication process
   */
  _handleLogin = () => {
    this.context.app.authenticate({
      type: 'local',
      email: this.props.email,
      password: this.props.password
    })
      .then((result) => {
        debugger;
      })
      .catch((err) => {
        debugger;
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
