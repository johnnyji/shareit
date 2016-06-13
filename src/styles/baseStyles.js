import {StyleSheet} from 'react-native';
import ColorScheme from './ColorScheme';

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerText: {
    textAlign: 'center'
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
