import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  // This is used to avoid putting any content in the IOS status bar
  // at the top of the phone
  escapeStatusBarIOS: {
    paddingTop: 20
  },
  fullWidth: {
    flex: 1
  },
  stretch: {
    alignItems: 'stretch'
  }
});
