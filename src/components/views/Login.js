import React, {Component, PropTypes} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {getParameterByName} from '../../utils/http';
import {instagram} from '../../../config';
import {loginWithInstagram} from '../../actions/AuthActionCreators';
import {setAlert} from '../../actions/AppActionCreators';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  description: {
    fontSize: 14
  },
  loginButton: {
    borderRadius: 10,
    backgroundColor: '#00D392',
    padding: 12
  },
  whiteText: {
    color: '#FFF'
  }
});

@connect((state) => ({
  authenticating: state.auth.get('authenticating')
}))
export default class Login extends Component {

  static displayName = 'Login';

  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    Linking.addEventListener('url', this._handleUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleUrl);
  }

  render() {
    return (
      <View style={styles.center}>
        <View style={styles.center}>
          <Text style={styles.title}>ShareIt</Text>
          <Text style={styles.description}>
            Get rewarded for posting on Instagram!
          </Text>
        </View>
        <View style={styles.center}>
          {this._renderLoginButton()}
        </View>
      </View>
    );
  }

  _renderLoginButton = () => {
    if (this.props.authenticating) {
      return (
        <Text style={styles.center}>
          One moment please...
        </Text>
      );
    }

    return (
      <TouchableOpacity
        onPress={this._handleInstagramLoginPress}
        style={styles.loginButton}>
        <Text style={styles.whiteText}>Instagram Login</Text>
      </TouchableOpacity>
    );
  }

  _handleInstagramLoginPress = () => {
    Linking.openURL(
      `${instagram.api.path}/oauth/authorize/` +
      `?client_id=${instagram.clientId}` +
      `&redirect_uri=${instagram.redirectUri}` +
      `&response_type=code`
    ).catch(() => {
      if (__DEV__) {
        console.log('Auth failed alert hit');
      }
      this.props.dispatch(setAlert({
        title: 'Oops, Authentication Error',
        message: 'Unable to connect to Instagram'
      }));
    });
  }

  _handleUrl = (event) => {
    const error = getParameterByName(event.url, 'error');
    const errorReason = getParameterByName(event.url, 'error_reason');
    const code = getParameterByName(event.url, 'code');

    if (code) this.props.dispatch(loginWithInstagram(code));

    // Alerts the user of a login failure
    if (error && errorReason) {
      this.props.dispatch(setAlert({
        title: 'Unable to Login',
        message: errorReason
      }));
    }
  }

}
