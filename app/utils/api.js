import axios from 'axios';
import config from 'config';

const api = axios.create({
  baseURL: config.signallingServer,
  timeout: 3000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json'
});

export default api;
