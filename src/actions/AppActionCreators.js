import {
  ON_CONNECTED,
  ON_CONNECTING,
  ON_DISCONNECT,
  SET_ALERT
} from '../action_types/AppActionTypes';

const AppActionCreators = {

  onConnecting() {
    return {
      type: ON_CONNECTING
    };
  },

  onConnected() {
    return {
      type: ON_CONNECTED
    };
  },

  onDisconnect() {
    return {
      type: ON_DISCONNECT
    };
  },

  
  setAlert({title, message}) {
    return {
      type: SET_ALERT,
      data: {title, message}
    };
  }

};

export default AppActionCreators;
