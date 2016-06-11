import {StyleSheet} from 'react-native';
import ColorScheme from '../ColorScheme';

export default StyleSheet.create({
  main: {
    backgroundColor: ColorScheme.primaryLight,
    flexDirection: 'row',
    padding: 12
  },
  text: {
    color: ColorScheme.white,
    fontWeight: 'bold',
    fontSize: 18
  }
});
