import {
  AUTHENTICATE,
  AUTHENTICATE_ERROR,
  AUTHENTICATE_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_PASSWORD
} from '../action_types/AuthActionTypes';
// import {api, instagram} from '../../config';
// import {toJson, post} from '../utils/http';
// import {setAlert} from '../actions/AppActionCreators';
// import camelCaseObject from 'camelcase-object';
// import curry from 'lodash/curry';

const AuthActionCreators = {

  authenticate() {
    return {
      type: AUTHENTICATE
    };
  },
  
  authenticateError(error) {
    debugger;
    return {
      type: AUTHENTICATE_ERROR,
      data: {errorMessage: error}
    };
  },

  authenticateSuccess({data}) {
    return {
      type: AUTHENTICATE_SUCCESS,
      data: {user: data}
    };
  },

  updateEmail(email) {
    return {
      type: UPDATE_EMAIL,
      data: {value: email, error: null}
    };
  },

  updatePassword(password) {
    return {
      type: UPDATE_PASSWORD,
      data: {value: password, error: null}
    };
  }
 //  loginWithInstagram(code) {
 //    return (dispatch) => {
 //      // NOTE: We must make our POST request data through the body
 //      // instead of using URL params, this is the only way to get
 //      // the Instagram API to recognize our data
 //      //
 //      // See: https://groups.google.com/forum/#!topic/instagram-api-developers/Dvu_4SXTDG4
 //      const formData = new FormData();
 //      formData.append('client_id', instagram.clientId);
 //      formData.append('client_secret', instagram.clientSecret);
 //      formData.append('grant_type', 'authorization_code');
 //      formData.append('redirect_uri', instagram.redirectUri);
 //      formData.append('code', code);
 //      // Creates a curried http.post that only requires the post data to
 //      // send a request
 //      const saveSessionToServer = curry(post)(`${api.path}/session/instagram`);

 //      fetch(`${instagram.api.path}/oauth/access_token/`, {
 //        method: 'POST',
 //        headers: {
 //          'Accept': 'application/json',
 //          'Content-Type': 'application/x-www-form-urlencoded'
 //        },
 //        body: formData
 //      })
 //        .then(toJson)
 //        .then(camelCaseObject)
 //        .then(saveSessionToServer)
 //        .then((response) => {
 //          // When the user session has successfully been saved on the server
 //        })
 //        .catch((error) => {
 //          dispatch(setAlert({
 //            title: 'Unable to login',
 //            message: error.message
 //          }));
 //          dispatch(AuthActionCreators.loginWithInstagramFailure());
 //          // TODO: Show popup "Unable to authenticate" and
 //          // redirect to login screen
 //        });
 //    };
 //  },

 //  loginWithInstagramFailure() {
 //    return {
 //      type: LOGIN_WITH_INSTAGRAM_FAILURE
 //    };
 //  }

};

export default AuthActionCreators;
