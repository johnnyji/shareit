import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import baseStyles from '../../../styles/baseStyles';
import Button from '../../ui/Button';
import ColorScheme from '../../../styles/ColorScheme';

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
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
      <View style={[styles.main, baseStyles.stretchCrossAxis]}>

        <View style={[baseStyles.centerChildren, {flex: 5}]}>
          <Text style={styles.title}>ShareIt</Text>
          <Text style={styles.description}>
            Find out whats going on near you!
          </Text>
        </View>

        <View style={[baseStyles.centerChildren, baseStyles.stretchCrossAxis, {flex: 2}]}>
          <Button
            label='Login'
            onClick={Actions.Login}
            style={{backgroundColor: ColorScheme.primaryLighter}} />
          <Button
            label='Sign up'
            onClick={Actions.Register}
            style={{backgroundColor: ColorScheme.primaryLight}} />
        </View>

      </View>
    );
  }

}
