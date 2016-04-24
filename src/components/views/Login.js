import React, {
  Component,
  Linking,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import http from '../../utils/http';
import config from '../../../config';
import AuthActionCreators from '../../actions/AuthActionCreators';
import ImmutablePropTypes from 'react-immutable-proptypes';

const {instagram} = config;
const {getParameterByName} = http;
const {loginWithInstagram} = AuthActionCreators;

const styles = StyleSheet.create({
  container: {
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
  loginButtonText: {
    color: '#FFF'
  }
});

export default class Login extends Component {

  static displayName = 'Login';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    Linking.addEventListener('url', this._handleUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleUrl);
  }

  render() {
    debugger;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>ShareIt</Text>
          <Text style={styles.description}>
            Get rewarded for posting on Instagram!
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this._handleInstagramLoginPress}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Instagram Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _handleInstagramLoginPress = () => {
    Linking.openURL(
      `${instagram.api.path}/oauth/authorize/` +
      `?client_id=${instagram.clientId}` +
      `&redirect_uri=${instagram.redirectUri}` +
      `&response_type=code`
    ).catch((err) => {
      // TODO: Add iOS alert
      debugger;
    });
  }

  _handleUrl = (event) => {
    const error = getParameterByName(event.url, 'error');
    const errorReason = getParameterByName(event.url, 'error_reason');
    const code = getParameterByName(event.url, 'code');

    if (code) this.context.dispatch(loginWithInstagram(code));
    // TODO: Handle error case
  }

}
