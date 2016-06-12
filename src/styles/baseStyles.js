import {StyleSheet} from 'react-native';
import ColorScheme from './ColorScheme';

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  // This is used to avoid putting any content in the IOS status bar
  // at the top of the phone
  escapeStatusBarIOS: {
    backgroundColor: 'transparent',
    height: 20
  },
  fullWidth: {
    flex: 1
  },
  stretch: {
    alignItems: 'stretch'
  },
  subheader: {
    color: ColorScheme.primary,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
