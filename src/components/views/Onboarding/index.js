import React, {Component} from 'react-native';
import CustomPropTypes from '../../utils/CustomPropTypes';
import PickName from './PickName';
import PickUsername from './PickUsername';
import RequiresCurrentUser from '../../../containers/RequiresCurrentUser';

@RequiresCurrentUser
export default class Onboarding extends Component {
  
  static displayName = 'Onboarding';

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired
  };

  render() {
    if (!this.props.currentUser.has('fullName')) return <PickName />;
    return <PickUsername />;
  }
}

