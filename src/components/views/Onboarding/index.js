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
    // TODO: Here we must take the current user's info and save it into our
    // onboarding reducer before we can actually show any onboarding components

    if (!this.props.currentUser.has('fullName')) return <PickName />;
    return <PickUsername />;
  }
}

