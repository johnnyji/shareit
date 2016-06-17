import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';

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

@connect((state) => ({
  currentUser: state.auth.get('currentUser')
}))
export default class Home extends Component {

  static displayName = 'Home';

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired
  };

  render() {
    const {currentUser} = this.props;

    // Have an input field like: 'Hello __Your Name__'
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>Hello {currentUser.get('email')}</Text>
      </View>
    );
  }

}
