import {
  ON_CONNECT,
  ON_DISCONNECT,
  SET_ALERT,
  SET_LOADING
} from '../action_types/AppActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  alert: {
    title: null,
    message: null
  },
  isConnected: false
});

export default function AppReducer(state = initialState, action) {
  switch (action.type) {

    case ON_CONNECT: {
      return state.set('isConnected', true);
    }

    case ON_DISCONNECT: {
      return state.set('isConnected', false);
    }

    case SET_ALERT: {
      return state.set('alert', Immutable.Map({
        title: action.data.title,
        message: action.data.message
      }));
    }

    default: {
      return state;
    }

  }
}
