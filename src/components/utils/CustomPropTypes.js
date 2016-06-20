import ImmutablePropTypes from 'react-immutable-proptypes';
import {PropTypes} from 'react-native';

export default {

  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),

  user: ImmutablePropTypes.mapContains({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    location: ImmutablePropTypes.mapContains({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired
    }),
    email: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    username: PropTypes.string
  })
};
