import React, {Component, StyleSheet, Text, View} from 'react-native';
import pureRender from 'pure-render-decorator';

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20
  }
});

@pureRender
export default class Offline extends Component {
  
  static displayName = 'Offline';

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>No Connection :(</Text>
      </View>
    );
  }

}
