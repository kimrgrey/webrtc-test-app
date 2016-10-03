import config from 'config';

const configureWebsocket = (dispatch) => {
  console.log('configuring websocket');
  const websocket = io(config.serverUrl);
};

export default configureWebsocket;
