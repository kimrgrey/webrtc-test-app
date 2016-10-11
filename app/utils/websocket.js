import config from 'config';

var instance = null;

const websocket = () => {
  if (instance === null) {
    instance = io(config.signallingServer);
  }
  return instance;
};

export default websocket;
