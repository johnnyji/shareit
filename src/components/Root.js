import React, {
  Alert,
  AsyncStorage,
  PropTypes,
  View
} from 'react-native';
import AuthActionCreators from '../actions/AuthActionCreators';
import FullPageSpinner from './ui/FullPageSpinner';
import Home from './views/Home';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Landing from './views/Landing';
import Login from './views/Login';
import Offline from './views/Offline';
import Onboarding from './views/Onboarding';
import Register from './views/Register';
import authentication from 'feathers-authentication/client';
import baseStyles from '../styles/baseStyles';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import {Router, Route} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {onConnect, onDisconnect} from '../actions/AppActionCreators';

// This is required for socket.io-client due to a bug in React Native debugger
if (window.navigator && Object.keys(window.navigator).length === 0) {
  window = Object.assign(window, {navigator: {userAgent: 'ReactNative'}});
}

const io = require('socket.io-client/socket.io');
const API_PATH = 'http://localhost:3030';


@connect((state) => ({
  alert: state.app.get('alert'),
  currentUser: state.app.get('currentUser'),
  fetchingCurrentUser: state.auth.get('fetchingCurrentUser'),
  fetchedCurrentUser: state.auth.get('fetchedCurrentUser'),
  isConnected: state.app.get('isConnected')
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
    fetchingCurrentUser: PropTypes.bool.isRequired,
    fetchedCurrentUser: PropTypes.bool.isRequired,
    isConnected: PropTypes.bool.isRequired
  };

  static childContextTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  
  constructor(props) {
    super(props);
    const socket = io(API_PATH, {transports: ['websocket'], forceNew: true});

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
      app: this.app,
      dispatch: this.props.dispatch
    };
  }

  componentDidMount() {
    this.app.io.on('connect', this._handleConnect);
    this.app.io.on('disconnect', this._handleDisconnect);
  }

  componentWillReceiveProps(nextProps) {
    const {alert: incomingAlert} = nextProps;

    // If there's a new alert, we want to display it to the user
    if (!this.props.alert.equals(incomingAlert)) {
      Alert.alert(
        incomingAlert.get('title'),
        incomingAlert.get('message')
      );
    }
  }

  render() {
    const {
      currentUser,
      fetchingCurrentUser,
      isConnected: clientIsConnected
    } = this.props;

    if (fetchingCurrentUser) return <FullPageSpinner />;

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
            component={Onboarding}
            hideNavBar={true}
            initial={clientIsConnected && currentUser && !currentUser.get('onboarded')}
            name='Onboarding'
            title='Onboarding' />

          <Route
            component={Home}
            hideNavBar={true}
            initial={clientIsConnected && currentUser && currentUser.get('onboarded')}
            name='Home'
            title='Home' />
        </Router>
      </View>
    );
  }


  _handleConnect = () => {
    const {dispatch} = this.props;

    dispatch(onConnect());
    dispatch(AuthActionCreators.authenticate());

    // Authenticate the user
    this.app.authenticate()
      .then((user) => {
        dispatch(AuthActionCreators.authenticateSuccess(user));
      })
      .catch((err) => {
        dispatch(AuthActionCreators.authenticateError(err.message));
      });
  };

  _handleDisconnect = () => {
    // Notify the store of the socket disconnection
    this.props.dispatch(onDisconnect());
  };
}
