import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  loading: false,
  members: [],
  room: {},
  localStream: {},
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
  return { ...state, members: [], room: {} };
};

const getLocalStream = (state, action) => {
  return { ...state, localStream: {} };
};

const getLocalStreamSuccess = (state, action) => {
  return { ...state, localStream: { stream: action.payload } };
};

const getLocalStreamFailure = (state, action) => {
  return { ...state, localStream: { error: action.payload } };
};

const closeLocalStream = (state, action) => {
  return { ...state, localStream: {} };
};

export default composeReducer('conference', {
  fetchRoom,
  fetchRoomSuccess,
  fetchRoomFailure,

  joinRoom,
  leaveRoom,

  storeMembers,

  getLocalStream,
  getLocalStreamSuccess,
  getLocalStreamFailure,
  closeLocalStream,
}, initialState);
