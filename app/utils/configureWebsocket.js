import { storeId } from 'actions/client';
import { storeMembers } from 'actions/conference';

const configureWebsocket = (websocket, dispatch) => {
  websocket.on('registered', (message) => dispatch(storeId(message)));
  websocket.on('members',    (message) => dispatch(storeMembers(message)));
};

export default configureWebsocket;
