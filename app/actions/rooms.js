import { createTypes } from 'redux-compose-reducer';
import api from 'utils/api';

const TYPES = createTypes('rooms', [
  'fetchRooms',
  'fetchRoomsSuccess',
  'fetchRoomsFailure',
  'createRoom',
  'createRoomCancel',
  'createRoomSubmit',
  'createRoomSuccess',
  'createRoomFailure',
]);

export const fetchRooms = () => {
  return (dispatch) => {
    dispatch({ type: TYPES.fetchRooms });

    api.get('/rooms')
      .then(({ data }) => dispatch({ type: TYPES.fetchRoomsSuccess, payload: data }))
      .catch((response) => dispatch({ type: TYPES.fetchRoomsFailure }));
  };
};

export const createRoom = () => ({ type: TYPES.createRoom });

export const createRoomSubmit = (room) => {
  return (dispatch) => {
    dispatch({ type: TYPES.createRoomSubmit });

    api.post('/rooms', room)
      .then(({ data }) => dispatch({ type: TYPES.createRoomSuccess, payload: data }))
      .catch((response) => dispatch({ type: TYPES.createRoomFailure }));
  };
};

export const createRoomCancel = () => ({ type: TYPES.createRoomCancel });
