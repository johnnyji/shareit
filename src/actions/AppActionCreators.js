import {
  SET_ALERT
} from '../action_types/AppActionTypes';

const AppActionCreators = {
  
  setAlert({title, message}) {
    return {
      type: SET_ALERT,
      data: {title, message}
    };
  }
  
};

export default AppActionCreators;
