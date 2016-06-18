import {
  ON_CONNECT,
  ON_DISCONNECT,
  SET_ALERT
} from '../action_types/AppActionTypes';

const AppActionCreators = {

  onConnect() {
    return {
      type: ON_CONNECT
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
