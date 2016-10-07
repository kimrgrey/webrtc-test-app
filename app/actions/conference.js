import { createTypes } from 'redux-compose-reducer';
import api from 'utils/api';
import websocket from 'utils/websocket';


const TYPES = createTypes('conference', [
  'fetchRoom',
  'fetchRoomSuccess',
  'fetchRoomFailure',
  'joinRoom',
  'leaveRoom',
  'storeMembers',
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

export const storeMembers = (message) => {
  return { type: TYPES.storeMembers, payload: JSON.parse(message) };
};
