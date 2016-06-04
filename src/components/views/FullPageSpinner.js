import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export default class FullPageSpinner extends Component {
  
  static displayName = 'FullPageSpinner';

  static propTypes = {
    text: PropTypes.string.isRequired
  };

  static defaultProps = {
    text: 'Loading...'
  };

  render() {
    return (
      <View style={styles.main}>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}

