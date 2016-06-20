import camelCaseObject from 'camelcase-object';

const buildHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
};

const http = {

  delete(path) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        method: 'delete',
        headers: buildHeaders()
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  get(path) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        headers: buildHeaders() 
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  getParameterByName(url, name) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');

    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },

  post(path, data) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify(data)
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  toJson(response) {
    return response.json();
  }

};

export default http;
