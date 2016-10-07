import { createTypes } from 'redux-compose-reducer';
import { websocket } from 'utils/websocket';

const TYPES = createTypes('conference', [
  'storeMembers',
  'joinRoom',
  'leaveRoom',
]);

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
