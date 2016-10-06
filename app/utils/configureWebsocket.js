import config from 'config';
import { storeId } from 'actions/client';

const configureWebsocket = (dispatch) => {
  const websocket = io(config.serverUrl);

  websocket.on('registered', (message) => dispatch(storeId(message)));

  return websocket;
};

export default configureWebsocket;
