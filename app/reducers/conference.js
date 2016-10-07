import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  members: [],
  room: {},
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
  storeMembers,
  joinRoom,
  leaveRoom,
}, initialState);
