import React, {
  Alert,
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import Home from '../components/views/Home';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loading from '../components/views/Loading';
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
    
    if (alertTitle && alertMessage) {
      Alert.alert(alertTitle, alertMessage);
    }
  }

  render() {
    if (!this.props.currentUser) return <Login />;
    return <Home />;
  }

}
