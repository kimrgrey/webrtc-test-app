import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  members: [],
  room: {},
  loading: false,
};

const fetchRoom = (state, action) => {
  return { ...state, room: {}, loading: true };
};

const fetchRoomSuccess = (state, action) => {
  return { ...state, room: action.payload, loading: false };
};

const fetchRoomFailure = (state, action) => {
  return { ...state, room: {}, loading: false };
};

const storeMembers = (state, action) => {
  return { ...state, members: action.payload };
};

const joinRoom = (state, action) => {
  return {  ...state, room: action.payload };
};

const leaveRoom = (state, action) => {
  return { ...state, room: {} };
};

export default composeReducer('conference', {
  fetchRoom,
  fetchRoomSuccess,
  fetchRoomFailure,
  joinRoom,
  leaveRoom,
  storeMembers,
}, initialState);
