import {
  ON_CONNECT,
  ON_DISCONNECT,
  SET_ALERT,
  SET_LOADING
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
  },

  setLoading(loading) {
    return {
      type: SET_LOADING,
      data: {loading}
    };
  }
  
};

export default AppActionCreators;
