import ImmutablePropTypes from 'react-immutable-proptypes';
import {PropTypes} from 'react-native';

const STR = PropTypes.string

export default {

  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),

  user: ImmutablePropTypes.mapContains({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })
};
