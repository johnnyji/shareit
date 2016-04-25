import {
  SET_ALERT
} from '../action_types/AppActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  alert: {
    title: null,
    message: null
  }
});

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
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
