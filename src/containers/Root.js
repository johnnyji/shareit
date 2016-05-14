import React, {Component, PropTypes} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import Home from '../components/views/Home';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Login from '../components/views/Login';

@connect((state) => ({
  alert: state.app.get('alert'),
  currentUser: state.auth.get('currentUser')
}))
export default class Root extends Component {

  static displayName = 'Root';

  static propTypes = {
    alert: ImmutablePropTypes.mapContains({
      title: PropTypes.string,
      message: PropTypes.string
    }).isRequired,
    currentUser: ImmutablePropTypes.map,
    dispatch: PropTypes.func.isRequired
  };

  static childContextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  getChildContext() {
    return {
      dispatch: this.props.dispatch
    };
  }

  componentDidUpdate() {
    const {alert} = this.props;
    const alertTitle = alert.get('title');
    const alertMessage = alert.get('message');
    
		// If there's an alert message, pop it up in the view
    if (alertTitle && alertMessage) {
      console.log('ALERT: ', alertMessage);
      Alert.alert(alertTitle, alertMessage);
    }
  }

  render() {
    if (!this.props.currentUser) return <Login />;
    return <Home />;
  }

}
