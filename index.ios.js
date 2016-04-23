import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Home from './src/components/views/Home.js';

class Router extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          title: "ShareIt",
          component: Home
        }}
        style={styles.navigator} />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

AppRegistry.registerComponent('shareit', () => Router);
