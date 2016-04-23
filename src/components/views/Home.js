import React, {
  Component,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {instagram} from '../../../config';

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

export default class Home extends Component {

  static displayName = 'Home';
  
  componentDidMount() {
    Linking.addEventListener('url', this._handleUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleUrl);
  }

  render() {
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
    console.log(instagram.redirectUri);
    Linking.openURL(
      'https://api.instagram.com/oauth/authorize/' +
      `?client_id=${instagram.clientId}` +
      `&redirect_uri=${instagram.redirectUri}` +
      `&response_type=code`
    ).catch((err) => {
      debugger;
    });
  }

  _handleUrl = (event) => {
    debugger;
  }

}
