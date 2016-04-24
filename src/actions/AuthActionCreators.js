import config from '../../config';

const {instagram} = config;

const AuthActionCreators = {

  loginWithInstagram(code) {
    return () => {
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

      fetch(`${instagram.api.path}/oauth/access_token/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      })
        .then((response) => response.json())
        .then((response) => {
          // TODO: Store `access_token` in the server session
          // and store the current user
        })
        .catch((response) => {
          // TODO: Show popup "Unable to authenticate" and
          // redirect to login screen
        });
    };
  }

};

export default AuthActionCreators;
