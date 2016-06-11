import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AuthActionCreators from '../../actions/AuthActionCreators';
import {center, stretch, fullWidth} from '../../styles/baseStyles';
import {connect} from 'react-redux';
import Button from '../ui/Button';
import Input from '../ui/Input';
// import config from '../../../config/dev';
// import {getParameterByName} from '../../utils/http';
// import {instagram} from '../../../config';
// import {loginWithInstagram} from '../../actions/AuthActionCreators';
// import {setAlert} from '../../actions/AppActionCreators';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  description: {
    fontSize: 14
  }
});

// const AUTH_URL = 'http://localhost:3030/auth/facebook';

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

  // componentDidMount() {
  //   Linking.addEventListener('url', this._handleUrl);
  // }

  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this._handleUrl);
  // }

  render() {
    
    return (
      <View style={fullWidth}>

        <View style={[center, {flex: 5}]}>
          <Text style={styles.title}>ShareIt</Text>
          <Text style={styles.description}>
            Find out whats going on near you!
          </Text>
        </View>

        <View style={[center, stretch, {flex: 2}]}>
          <Input
            onUpdate={this._handleUpdateEmail}
            placeholder='Email'
            style={{flex: 5}}
            value={this.props.email} />
          <Input
            onUpdate={this._handleUpdatePassword}
            placeholder='Password'
            style={{flex: 5}}
            value={this.props.password} />
          <Button
            disabled={this.props.authenticating}
            label={this.props.authenticating ? 'One moment...' : 'Login / Register'}
            onClick={this._handleClick}
            style={{flex: 3}} />
        </View>

      </View>
    );
  }

  /**
   * Handles clicking the login button and beginning
   * the authentication process
   */
  _handleClick = () => {
    this.props.dispatch(
      AuthActionCreators.authenticate(
        this.props.email,
        this.props.password
      )
    );
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
