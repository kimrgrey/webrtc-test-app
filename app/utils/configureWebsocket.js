import { storeId } from 'actions/application';
import {
  storeMembers,
  addMember,
  removeMember,
  processWebRTC,
  receiveMessage,
} from 'actions/conference';

const configureWebsocket = (websocket, dispatch) => {
  websocket.on('registered', (message) => dispatch(storeId(message)));
  websocket.on('members',    (message) => dispatch(storeMembers(message)));
  websocket.on('joined',     (message) => dispatch(addMember(message)));
  websocket.on('left',       (message) => dispatch(removeMember(message)));
  websocket.on('webrtc',     (message) => dispatch(processWebRTC(message)));
  websocket.on('message',    (message) => dispatch(receiveMessage(message)));
};

export default configureWebsocket;
