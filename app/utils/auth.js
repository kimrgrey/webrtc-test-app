import axios from 'axios';
import config from 'config';

const credentialsStore = {
  iceServers: {},
  expires: -1,
};

var runningRequest = null;

const auth = axios.create({
  baseURL: config.authUrl,
  timeout: 3000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json'
});

const credentialsValid = () => (
  credentialsStore.expires && (parseInt(Date.now() / 1000) < credentialsStore.expires)
);

const fetch = (userId) => {
  if (runningRequest) {
    return runningRequest;
  }
  else if (credentialsValid()) {
    return new Promise((resolve) => {
      resolve(credentialsStore.iceServers);
    });
  }
  else {
    runningRequest = auth.get('/', {
      params: {
        username: userId,
        realm: config.realm
      }
    })
    .then(({ data }) => {
      const { iceServers, expires } = data;

      runningRequest = null;

      credentialsStore.iceServers = iceServers;
      credentialsStore.expires = expires;

      return credentialsStore.iceServers;
    })
    .catch(error => {
      runningRequest = null;
      throw error;
    });

    return runningRequest;
  }
};

const reset = () => {
  credentialsStore.iceServers = {};
  credentialsStore.expires = -1;
};

module.exports = {
  fetch,
  reset,
};
