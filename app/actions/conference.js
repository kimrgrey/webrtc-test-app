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

  'addMember',
  'removeMember',
  'processWebRTC',

  'addRemoteStream',
  'removeRemoteStream',

  'sendMessage',
  'receiveMessage',

  'toggleAudio',
  'toggleVideo',
]);

export const joinRoom = (id) => {
  return (dispatch) => {

    const payload = {};

    dispatch({ type: TYPES.joinRoom });

    api.get('/rooms/' + id)
      .then(({ data }) => { payload.room = data })
      .then(()         => ( localStream.getLocalStream().catch(() => (null)) ))
      .then((stream)   => {
        payload.stream = stream;
        peersStore.setLocalStream(stream);
      })
      .then(()         => websocket().emit('join', JSON.stringify({ id })))
      .then(()         => dispatch({ type: TYPES.joinRoomSuccess, payload }))
      .catch(()        => {
        localStream.closeLocalStream(payload.localStream);
        peersStore.cleanup();
        dispatch({ type: TYPES.joinRoomFailure })
      });
  };
};

export const leaveRoom = (roomId, stream) => {
  return (dispatch) => {
    dispatch({ type: TYPES.leaveRoom });
    peersStore.cleanup();
    localStream.closeLocalStream(stream.stream);
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

export const addMember = (message) => {
  const client = JSON.parse(message);

  return (dispatch) => {
    dispatch({ type: TYPES.addMember, payload: client });
    dispatch({ type: TYPES.addRemoteStream, payload: { id: client.id } });
    peersStore.handleClientJoined(message);
  };
};

export const removeMember = (message) => {
  const client = JSON.parse(message);

  return (dispatch) => {
    dispatch({ type: TYPES.removeRemoteStream, payload: { id: client.id } });
    dispatch({ type: TYPES.removeMember, payload: client });

    peersStore.handleClientLeft(message);
  };
};

export const addRemoteStream = (remoteStream) => {
  return { type: TYPES.addRemoteStream, payload: remoteStream };
};

export const removeRemoteStream = (remoteStream) => {
  return { type: TYPES.removeRemoteStream, payload: remoteStream };
};

export const processWebRTC = (message) => {
  return (dispatch) => {
    dispatch({ type: TYPES.processWebRTC });
    peersStore.handleWebRTCMessage(message);
  };
};

export const sendMessage = (sender, text) => {
  const type = 'outcoming';

  return (dispatch) => {
    dispatch({ type: TYPES.sendMessage, payload: { sender, text, type } });
    websocket().emit('message', JSON.stringify({
      sender,
      text,
    }));
  };
};

export const receiveMessage = (message) => {
  const { sender, text } = JSON.parse(message);
  const type = 'incoming';

  return { type: TYPES.receiveMessage, payload: { sender, text, type } };
};

export const toggleAudio = (on) => {
  return { type: TYPES.toggleAudio, payload: { on } };
};

export const toggleVideo = (on) => {
  return { type: TYPES.toggleVideo, payload: { on } };
};
