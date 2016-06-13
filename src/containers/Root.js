import React, {
  AsyncStorage,
  PropTypes,
  View
} from 'react-native';
import FullPageSpinner from '../components/ui/FullPageSpinner';
import Home from '../components/views/Home';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Landing from '../components/views/Landing';
import Login from '../components/views/Login';
import Offline from '../components/views/Offline';
import Register from '../components/views/Register';
import authentication from 'feathers-authentication/client';
import baseStyles from '../styles/baseStyles';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import {Router, Route} from 'react-native-router-flux';
import {authenticateError, authenticateSuccess} from '../actions/AuthActionCreators';
import {connect} from 'react-redux';
import {onConnect, onDisconnect, setLoading} from '../actions/AppActionCreators';

// This is required for socket.io-client due to a bug in React Native debugger
if (window.navigator && Object.keys(window.navigator).length === 0) {
  window = Object.assign(window, {navigator: {userAgent: 'ReactNative'}});
}

const io = require('socket.io-client/socket.io');
const API_PATH = 'http://localhost:3030';


@connect((state) => ({
  alert: state.app.get('alert'),
  currentUser: state.auth.get('currentUser'),
  isConnected: state.app.get('isConnected'),
  isLoading: state.app.get('isLoading')
}))
export default class Root extends React.Component {

  static displayName = 'Root';

  static propTypes = {
    alert: ImmutablePropTypes.mapContains({
      title: PropTypes.string,
      message: PropTypes.string
    }).isRequired,
    app: PropTypes.any,
    currentUser: ImmutablePropTypes.map,
    dispatch: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  static childContextTypes = {
    app: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const options = {transports: ['websocket'], forceNew: true};
    const socket = io(API_PATH, options);

    this.app = feathers()
      .configure(socketio(socket))
      .configure(hooks())
      // Use AsyncStorage to store our login toke
      .configure(authentication({
        storage: AsyncStorage
      }));
  }

  getChildContext() {
    return {
      app: this.app
    };
  }

  componentDidMount() {
    this.app.io.on('connect', this._handleConnect);
    this.app.io.on('disconnect', this._handleDisconnect);
  }

  render() {
    const {
      currentUser,
      isConnected: clientIsConnected,
      isLoading
    } = this.props;

    if (isLoading) return <FullPageSpinner />;

    return (
      <View style={baseStyles.fullWidth}>
        <Router hideNavBar={true}>
          <Route
            component={Offline}
            hideNavBar={true}
            initial={!clientIsConnected}
            name='Offline'
            title='Offline' />

          <Route
            component={Landing}
            hideNavBar={true}
            initial={clientIsConnected && !currentUser}
            name='Landing'
            title='Landing' />
          <Route
            component={Login}
            hideNavBar={true}
            name='Login'
            title='Login' />
          <Route
            component={Register}
            hideNavBar={true}
            name='Register'
            title='Register' />

          <Route
            component={Home}
            hideNavBar={true}
            initial={clientIsConnected && currentUser}
            name='Home'
            title='Home' />
        </Router>
      </View>
    );
  }


  _handleConnect = () => {
    const {dispatch} = this.props;

    dispatch(onConnect());

    // Authenticate the user
    this.app.authenticate()
      .then((user) => {
        dispatch(setLoading(false));
        dispatch(authenticateSuccess(user));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(authenticateError(err.message));
      });
  };

  _handleDisconnect = () => {
    // Notify the store of the socket disconnection
    this.props.dispatch(onDisconnect());
  };
}
