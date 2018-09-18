// Helpers for talking to the backend.
import Config from '../Config';

export default class Backend {
  constructor (token) {
    this.token = token;
  }

  isAuthenticated() {
    return this.token !== null;
  }

  request (endpoint, data, onSuccess, onError) {
    if (!this.isAuthenticated()) {
      var err = new Error('Unauthorized');
      err.statusCode = 401;
      err.response = {};
      onError(err);
      return;
    }
    data = Object.assign({}, data, {'token': this.token});
    return this.requestNoAuth(endpoint, data, onSuccess, onError);
  }

  requestNoAuth (endpoint, data, onSuccess, onError) {
    return fetch(Config.apiHost + endpoint, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        var err = new Error('Failed request');
        err.response = response;
        throw err;
      }
    }).then(onSuccess, e => {
      if (e instanceof TypeError) {
        // Network error
        var err = new Error('Network failure');
        err.statusCode = null;
        err.response = {error: 'Could not connect to backend: ' + e.message};
        onError(err);
      } else {
        e.response.json().then(function(json) {
          var err = new Error(e.response.statusText);
          err.statusCode = e.response.status;
          err.response = json;
          onError(err);
        });
      }
    });
  }
}

