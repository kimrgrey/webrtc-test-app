import { createTypes } from 'redux-compose-reducer';
import { push } from 'react-router-redux';
import api from 'utils/api';
import websocket from 'utils/websocket';
import localStream from 'utils/localStream';


const TYPES = createTypes('conference', [
  'joinRoom',
  'joinRoomSuccess',
  'joinRoomFailure',

  'leaveRoom',
  'leaveRoomWithRedirect',

  'storeMembers',
]);

export const joinRoom = (id) => {
  return (dispatch) => {

    const payload = {};

    dispatch({ type: TYPES.joinRoom });

    api.get('/rooms/' + id)
      .then(({ data }) => { payload.room = data })
      .then(()         => ( localStream.getLocalStream() ))
      .then((stream)   => { payload.localStream = stream })
      .then(()         => { websocket.emit('join', JSON.stringify({ id })) })
      .then(()         => dispatch({ type: TYPES.joinRoomSuccess, payload }))
      .catch(()        => dispatch({ type: TYPES.joinRoomFailure }));
  };
};

export const leaveRoom = (roomId, stream) => {
  return (dispatch) => {
    dispatch({ type: TYPES.leaveRoom });
    localStream.closeLocalStream(stream);
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
