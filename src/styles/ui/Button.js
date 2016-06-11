import {StyleSheet} from 'react-native';
import ColorScheme from '../ColorScheme';

export default StyleSheet.create({
  main: {
    backgroundColor: ColorScheme.primary,
    flexDirection: 'row',
    padding: 12
  },
  disabled: {
    backgroundColor: ColorScheme.disabled
  },
  disabledText: {
    color: ColorScheme.disabledText
  },
  text: {
    color: ColorScheme.white,
    fontWeight: 'bold',
    fontSize: 18
  }
});
