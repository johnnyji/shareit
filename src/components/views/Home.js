import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default class Home extends Component {

  static displayName = 'Home';

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>Hello You've hit the Home page!</Text>
      </View>
    );
  }

}
