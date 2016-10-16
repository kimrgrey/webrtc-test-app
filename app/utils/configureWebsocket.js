import { storeId } from 'actions/application';
import {
  storeMembers,
  connectPeer,
  disconnectPeer,
  processWebRTC,
  receiveMessage,
} from 'actions/conference';

const configureWebsocket = (websocket, dispatch) => {
  websocket.on('registered', (message) => dispatch(storeId(message)));
  websocket.on('members',    (message) => dispatch(storeMembers(message)));
  websocket.on('joined',     (message) => dispatch(connectPeer(message)));
  websocket.on('left',       (message) => dispatch(disconnectPeer(message)));
  websocket.on('webrtc',     (message) => dispatch(processWebRTC(message)));
  websocket.on('message',    (message) => dispatch(receiveMessage(message)));
};

export default configureWebsocket;
