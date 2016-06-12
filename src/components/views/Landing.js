import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {center, stretch, fullWidth} from '../../styles/baseStyles';
import Button from '../ui/Button';
import {primaryLight, primaryLighter} from '../../styles/ColorScheme';

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

export default class Login extends Component {

  static displayName = 'Login';

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
          <Button
            label='Login'
            onClick={Actions.Login}
            style={{backgroundColor: primaryLighter}} />
          <Button
            label='Sign up'
            onClick={Actions.Register}
            style={{backgroundColor: primaryLight}} />
        </View>

      </View>
    );
  }

}
