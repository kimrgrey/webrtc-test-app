import { createTypes } from 'redux-compose-reducer';
import { push } from 'react-router-redux';
import api from 'utils/api';
import websocket from 'utils/websocket';
import localStream from 'utils/localStream';


const TYPES = createTypes('conference', [
  'fetchRoom',
  'fetchRoomSuccess',
  'fetchRoomFailure',

  'joinRoom',
  'leaveRoom',
  'leaveRoomWithRedirect',

  'storeMembers',

  'getLocalStream',
  'getLocalStreamSuccess',
  'getLocalStreamFailure',
  'closeLocalStream',
]);

export const fetchRoom = (id) => {
  return (dispatch) => {
    dispatch({ type: TYPES.fetchRoom });

    api.get('/rooms/' + id)
      .then(({ data }) => {
              dispatch({ type: TYPES.fetchRoomSuccess, payload: data });
              dispatch(joinRoom(data));
            })
      .catch((response) => dispatch({ type: TYPES.fetchRoomFailure }));
  };
};

export const joinRoom = (room) => {
  return (dispatch) => {
    dispatch({ type: TYPES.joinRoom, payload: room });
    websocket.emit('join', JSON.stringify(room));
  };
};

export const leaveRoom = () => {
  return (dispatch) => {
    dispatch({ type: TYPES.leaveRoom });
    websocket.emit('leave');
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

export const getLocalStream = () => {
  return (dispatch) => {
    dispatch({ type: TYPES.getLocalStream });

    localStream.getLocalStream()
      .then((stream) => dispatch({ type: TYPES.getLocalStreamSuccess, payload: stream }))
      .catch((error) => dispatch({ type: TYPES.getLocalStreamFailure, payload: error }));
  };
};

export const closeLocalStream = (stream) => {
  return (dispatch) => {
    dispatch({ type: TYPES.closeLocalStream });
    stream.getTracks().forEach((track) => track.stop());
  };
};
