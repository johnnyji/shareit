import React, {
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';
import PickName from './PickName';
import PickUsername from './PickUsername';
import RequiresCurrentUser from '../../../containers/RequiresCurrentUser';
import RequiresNewLocation from '../../../containers/RequiresNewLocation';

@RequiresCurrentUser
@RequiresNewLocation
@connect((state) => ({
  name: state.onboarding.getIn(['form', 'name', 'value']),
  nameError: state.onboarding.getIn(['form', 'name', 'error']),
  username: state.onboarding.getIn(['form', 'username', 'value']),
  usernameError: state.onboarding.getIn(['form', 'username', 'error'])
}))
export default class Onboarding extends Component {
  
  static displayName = 'Onboarding';

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    name: PropTypes.string.isRequired,
    nameError: PropTypes.string,
    username: PropTypes.string.isRequired,
    usernameError: PropTypes.string
  };

  render() {
    const {currentUser, name, nameError, username, usernameError} = this.props;

    if (currentUser.get('fullName') === '') {
      return (
        <PickName
          currentUser={currentUser}
          name={name}
          nameError={nameError} />
      );
    }

    return (
      <PickUsername
        currentUser={currentUser}
        username={username}
        usernameError={usernameError} />
    );
  }
}

