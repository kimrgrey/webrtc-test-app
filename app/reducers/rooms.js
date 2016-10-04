import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  loading: false,
  rooms: [],
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

export default composeReducer('rooms', {
  fetchRooms,
  fetchRoomsSuccess,
  fetchRoomsFailure,
}, initialState);
