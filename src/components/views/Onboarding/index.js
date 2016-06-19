import React, {
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';
import PickName from './PickName';
import PickUsername from './PickUsername';
import RequiresCurrentUser from '../../../containers/RequiresCurrentUser';

@RequiresCurrentUser
@connect((state) => ({
  name: state.onboarding.getIn(['form', 'name', 'value']),
  nameError: state.onboarding.getIn(['form', 'name', 'error'])
}))
export default class Onboarding extends Component {
  
  static displayName = 'Onboarding';

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    name: PropTypes.string.isRequired,
    nameError: PropTypes.string
  };

  render() {
    const {currentUser, name, nameError} = this.props;

    if (currentUser.get('fullName') === '') {
      return <PickName
        currentUser={currentUser}
        name={name}
        nameError={nameError} />;
    }

    return <PickUsername />;
  }
}

