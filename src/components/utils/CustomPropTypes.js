import {PropTypes} from 'react-native';

export default {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ])
};
