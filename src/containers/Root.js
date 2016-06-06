import React, {AsyncStorage, PropTypes} from 'react-native';
import {Actions, Router, Route} from 'react-native-router-flux';
import {authenticateError, authenticateSuccess} from '../actions/AuthActionCreators';
import {connect} from 'react-redux';
import {onConnect, onDisconnect, setLoading} from '../actions/AppActionCreators';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Login from '../components/views/Login';
import FullPageSpinner from '../components/views/FullPageSpinner';
import Home from '../components/views/Home';
import Offline from '../components/views/Offline';
import authentication from 'feathers-authentication/client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';

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
  loading: state.app.get('loading')
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
    loading: PropTypes.bool.isRequired
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

  componentDidMount() {
    this.app.io.on('connect', this._handleConnect);
    this.app.io.on('disconnect', this._handleDisconnect);
  }

  render() {
    const {
      currentUser,
      isConnected: clientIsConnected,
      loading
    } = this.props;

    if (loading) return <FullPageSpinner />;

    return (
      <Router hideNavBar={true}>
        <Route
          component={Offline}
          hideNavBar={true}
          initial={!clientIsConnected}
          name='Offline'
          title='Offline' />
        <Route
          component={Login}
          hideNavBar={true}
          initial={clientIsConnected && !currentUser}
          name='Login'
          title='Login' />
        <Route
          component={Home}
          hideNavBar={true}
          initial={clientIsConnected && currentUser}
          name='Home'
          title='Home' />
      </Router>
    );
  }


  _handleConnect = () => {
    const {dispatch} = this.props;

    // Notify the connection to the store
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
    const {dispatch} = this.props;

    // Notify the store of the socket disconnection
    dispatch(onDisconnect());
  };
}
