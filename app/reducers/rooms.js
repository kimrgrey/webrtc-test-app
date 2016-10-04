import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  loading: false,
  rooms: [],
  creatingRoom: false,
};

export const fetchRooms = (state, action) => {
  return { ...state, loading: true, rooms: [] };
};

export const fetchRoomsSuccess = (state, action) => {
  return { ...state, loading: false, rooms: action.payload };
};

export const fetchRoomsFailure = (state, action) => {
  return { ...state, loading: false, rooms: [] };
};

export const createRoom = (state, action) => {
  return { ...state, creatingRoom: true };
};

export const createRoomCancel = (state, action) => {
  return { ...state, creatingRoom: false };
};

export default composeReducer('rooms', {
  fetchRooms,
  fetchRoomsSuccess,
  fetchRoomsFailure,
  createRoom,
  createRoomCancel,
}, initialState);
