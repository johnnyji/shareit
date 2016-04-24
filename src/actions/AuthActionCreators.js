import {api, instagram} from '../../config';
import {toJson, post} from '../utils/http';
import camelCaseObject from 'camelcase-object';
import curry from 'lodash/curry';

const AuthActionCreators = {

  loginWithInstagram(code) {
    return (dispatch) => {
      // NOTE: We must make our POST request data through the body
      // instead of using URL params, this is the only way to get
      // the Instagram API to recognize our data
      //
      // See: https://groups.google.com/forum/#!topic/instagram-api-developers/Dvu_4SXTDG4
      const formData = new FormData();
      formData.append('client_id', instagram.clientId);
      formData.append('client_secret', instagram.clientSecret);
      formData.append('grant_type', 'authorization_code');
      formData.append('redirect_uri', instagram.redirectUri);
      formData.append('code', code);
      // Creates a curried http.post that only requires the post data to
      // send a request
      const saveSessionToServer = curry(post)(`${api.path}/session/instagram`);

      fetch(`${instagram.api.path}/oauth/access_token/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      })
        .then(toJson)
        .then(camelCaseObject)
        .then(saveSessionToServer)
        .then((response) => {
          // When the user session has successfully been saved on the server
        })
        .catch((response) => {
          debugger;
          // TODO: Show popup "Unable to authenticate" and
          // redirect to login screen
        });
    };
  }

};

export default AuthActionCreators;
