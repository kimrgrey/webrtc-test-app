import { createTypes } from 'redux-compose-reducer';
import { push } from 'react-router-redux';
import api from 'utils/api';
import websocket from 'utils/websocket';
import localStream from 'utils/localStream';
import peersStore from 'utils/peersStore';


const TYPES = createTypes('conference', [
  'joinRoom',
  'joinRoomSuccess',
  'joinRoomFailure',

  'leaveRoom',
  'leaveRoomWithRedirect',

  'storeMembers',

  'connectPeer',
  'disconnectPeer',
  'processWebRTC',

  'updateRemoteStreams',
]);

export const joinRoom = (id) => {
  return (dispatch) => {

    const payload = {};

    dispatch({ type: TYPES.joinRoom });

    api.get('/rooms/' + id)
      .then(({ data }) => { payload.room = data })
      .then(()         => ( localStream.getLocalStream() ))
      .then((stream)   => {
        payload.localStream = stream;
        peersStore.setLocalStream(stream);
      })
      .then(()         => { websocket().emit('join', JSON.stringify({ id })) })
      .then(()         => dispatch({ type: TYPES.joinRoomSuccess, payload }))
      .catch(()        => dispatch({ type: TYPES.joinRoomFailure }));
  };
};

export const leaveRoom = (roomId, stream) => {
  return (dispatch) => {
    dispatch({ type: TYPES.leaveRoom });
    peersStore.cleanup();
    localStream.closeLocalStream(stream);
    websocket().emit('leave');
  };
};

export const leaveRoomWithRedirect = () => {
  return (dispatch) => {
    dispatch({ type: TYPES.leaveRoomWithRedirect });
    dispatch(push('/'));
  };
};

export const storeMembers = (message) => {
  return { type: TYPES.storeMembers, payload: JSON.parse(message) };
};

export const connectPeer = (message) => {
  return (dispatch) => {
    dispatch({ type: TYPES.connectPeer });
    peersStore.handleClientJoined(message);
  };
};

export const disconnectPeer = (message) => {
  return (dispatch) => {
    dispatch({ type: TYPES.disconnectPeer });
    peersStore.handleClientLeft(message);
  };
};

export const processWebRTC = (message) => {
  return (dispatch) => {
    dispatch({ type: TYPES.processWebRTC });
    peersStore.handleWebRTCMessage(message);
  };
};

export const updateRemoteStreams = () => (
  { type: TYPES.updateRemoteStreams, payload: peersStore.getRemoteStreams() }
);
