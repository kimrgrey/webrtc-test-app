import { createTypes } from 'redux-compose-reducer';
import { push } from 'react-router-redux';
import lodash from 'lodash';
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

  'addRemoteConnection',
  'updateRemoteConnection',
  'removeRemoteConnection',

  'sendMessage',
  'receiveMessage',

  'toggleAudio',
  'toggleVideo',

  'toggleRemoteAudio',
  'toggleRemoteVideo',
]);

export const joinRoom = (id) => {
  return (dispatch) => {

    const payload = {};

    dispatch({ type: TYPES.joinRoom });

    api.get('/rooms/' + id)
      .then(({ data }) => { payload.room = data })
      .then(()         => localStream.getVideo())
      .then(stream     => stream || localStream.getAudio())
      .then(stream     => {
        payload.mainStream = stream;
        peersStore.setLocalStream(stream);
      })
      .then(()         => localStream.getLocalVideo())
      .then(stream     => {
        payload.previewStream = stream;
      })
      .then(()         => websocket().emit('join', JSON.stringify({ id })))
      .then(()         => dispatch({ type: TYPES.joinRoomSuccess, payload }))
      .catch(e         => {
        console.log(e);
        localStream.close();
        peersStore.cleanup();
        dispatch({ type: TYPES.joinRoomFailure })
      });
  };
};

export const leaveRoom = () => {
  return (dispatch) => {
    dispatch({ type: TYPES.leaveRoom });
    peersStore.cleanup();
    localStream.close();
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
  const members = JSON.parse(message);

  return (dispatch) => {
    dispatch({ type: TYPES.storeMembers, payload: members });

    lodash.values(members).forEach(member => {
      peersStore.handleClientJoined(member);
    });
  };
};

export const addMember = (message) => {
  const client = JSON.parse(message);
  return { type: TYPES.addMember, payload: client };
};

export const removeMember = (message) => {
  const client = JSON.parse(message);

  return (dispatch) => {
    dispatch({ type: TYPES.removeMember, payload: client });

    peersStore.handleClientLeft(client);
  };
};

export const addRemoteConnection = (connection) => {
  return { type: TYPES.addRemoteConnection, payload: connection };
};

export const updateRemoteConnection = (connection) => {
  return { type: TYPES.updateRemoteConnection, payload: connection };
};

export const removeRemoteConnection = (connection) => {
  return { type: TYPES.removeRemoteConnection, payload: connection };
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

export const toggleAudio = (sender, on) => {
  return (dispatch) => {
    dispatch({ type: TYPES.toggleAudio, payload: { sender, on } });
    websocket().emit('toggle-audio', JSON.stringify({
      sender,
      on,
    }));
  }
};

export const toggleVideo = (sender, on) => {
  return (dispatch) => {
    dispatch({ type: TYPES.toggleVideo, payload: { sender, on } });
    websocket().emit('toggle-video', JSON.stringify({
      sender,
      on,
    }));
  };
};

export const toggleRemoteAudio = (message) => {
  const { sender, on } = JSON.parse(message);
  return { type: TYPES.toggleRemoteAudio, payload: { sender, on } };
};

export const toggleRemoteVideo = (message) => {
  const { sender, on } = JSON.parse(message);
  return { type: TYPES.toggleRemoteVideo, payload: { sender, on } };
};
