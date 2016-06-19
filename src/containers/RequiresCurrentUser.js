import React, {Component} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import CustomPropTypes from '../components/utils/CustomPropTypes';
import FullPageSpinner from '../components/ui/FullPageSpinner';

export default (ComposedComponent) => {

  class RequiresCurrentUser extends Component {
    static displayName = 'RequiresCurrentUser';

    static propTypes = {
      currentUser: CustomPropTypes.user
    };

    componentDidUpdate() {
      if (!this.props.currentUser) {
        Actions.Landing();
      }
    }

    render() {
      if (!this.props.currentUser) return <FullPageSpinner />;
        
      return <ComposedComponent {...this.props} {...this.state} />;
    }
  }

  return connect((state) => ({
    currentUser: state.app.get('currentUser')
  }))(RequiresCurrentUser);

};
