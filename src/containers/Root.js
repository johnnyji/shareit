import React, {
  Component,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import Home from '../components/views/Home';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loading from '../components/views/Loading';
import Login from '../components/views/Login';

class Root extends Component {

  static displayName = 'Root';

  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
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
  
  render() {
    if (this.props.authenticating) return <Loading />;
    if (!this.props.currentUser) return <Login />;
    return <Home />;
  }

}

export default connect((state) => ({
  authenticating: state.auth.get('authenticating'),
  currentUser: state.auth.get('currentUser')
}))(Root);
