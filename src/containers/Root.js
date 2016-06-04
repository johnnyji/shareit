import React, {Component, PropTypes} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {onConnect, onDisconnect, setLoading} from '../actions/AppActionCreators';
import {authenticateError, authenticateSuccess} from '../actions/AuthActionCreators';
import config from '../../config/dev'; // TODO: Change to production config
import feathers from 'feathers/client';
import feathersAuthentication from 'feathers-authentication/client';
import feathersSocketIo from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import ImmutablePropTypes from 'react-immutable-proptypes';

// Views
import FullPageSpinner from '../components/views/FullPageSpinner';
import Home from '../components/views/Home';
import Login from '../components/views/Login';
import Offline from '../components/views/Offline';

// This is required for socket.io-client due to a bug in React Native debugger
if (window.navigator && Object.keys(window.navigator).length === 0) {
  window = Object.assign(window, {navigator: {userAgent: 'ReactNative'}});
}

const io = require('socket.io-client/socket.io');

@connect((state) => ({
  alert: state.app.get('alert'),
  currentUser: state.auth.get('currentUser'),
  isConnected: state.app.get('isConnected'),
  loading: state.app.get('loading')
}))
export default class Root extends Component {

  static displayName = 'Root';

  static propTypes = {
    alert: ImmutablePropTypes.mapContains({
      title: PropTypes.string,
      message: PropTypes.string
    }).isRequired,
    currentUser: ImmutablePropTypes.map,
    dispatch: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  };

  static childContextTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const socketOptions = {
      transports: ['websockets'],
      forceNew: true
    };
    const socket = io(config.api.path, socketOptions);

    // Initiates the Feathers client
    this.app = feathers()
      // Configures web sockets for Feathers
      .configure(feathersSocketIo(socket))
      .configure(hooks())
      // Uses AsyncStorage to store the JWT auth token
      .configure(feathersAuthentication({
        storage: AsyncStorage
      }));

    this.app.io.on('connect', this._handleConnection);
    this.app.io.on('disconnect', this._handleDisconnect);
  }

  getChildContext() {
    return {
      app: this.app,
      dispatch: this.props.dispatch
    };
  }

  componentWillMount () {
    debugger;
  }

  // componentWillReceiveProps (nextProps) {
  //   if (!this.props.currentUser && nextProps.currentUser) {
  //     // Actions.dashboard();
  //   }
  // }

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
    const {
      currentUser,
      isConnected: clientIsConnected,
      loading
    } = this.props;

    if (loading) return <FullPageSpinner />;

    return (
      <Router>
        <Scene key="root">
          <Scene key="Offline" component={Offline} title="Offline" initial={!clientIsConnected} />
          <Scene key="Login" component={Login} title="Login" initial={clientIsConnected && !currentUser} />
          <Scene key="Home" component={Home} title="Home" initial={clientIsConnected && currentUser} />
        </Scene>
      </Router>
    );
  }

  /**
   * When the socket connects, we attempt to authenticate the user
   */
  _handleConnection = () => {
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

  /**
   * Handles the socket disconnecting
   */
  _handleDisconnect = () => {
    const {dispatch} = this.props;

    // Notify the store of the socket disconnection
    dispatch(onDisconnect());
  };

}
