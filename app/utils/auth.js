import axios from 'axios';
import config from 'config';

const credentialsStore = {};

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
  if (credentialsValid()) {
    return new Promise((resolve) => {
      resolve(credentialsStore.iceServers);
    });
  }
  else {
    return auth.get('/', {
      params: {
        username: userId
      }
    })
    .then(({ data }) => {
      const { iceServers, expires } = data;

      credentialsStore.iceServers = iceServers;
      credentialsStore.expires = expires;

      return credentialsStore.iceServers;
    })
  }
};

module.exports = {
  fetch
};
