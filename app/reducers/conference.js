import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  connecting: false,
  members: [],
  room: null,
  localStream: null,
  remoteStreams: {},
};

const storeMembers = (state, action) => {
  return { ...state, members: action.payload };
};

const joinRoom = (state, action) => {
  return { ...state, connecting: true };
};

const joinRoomSuccess = (state, action) => {
  const { room, localStream } = action.payload;

  return {
    ...state,
    connecting: false,
    localStream,
    room,
  };
};

const joinRoomFailure = (state, action) => {
  return { ...state, connecting: false };
};

const leaveRoom = (state, action) => {
  return {
    ...state,
    localStream: null,
    members: [],
    remoteStreams: {},
    room: null,
  };
};

const updateRemoteStreams = (state, action) => {
  return { ...state, remoteStreams: action.payload };
};

export default composeReducer('conference', {
  joinRoom,
  joinRoomSuccess,
  joinRoomFailure,

  leaveRoom,

  storeMembers,

  updateRemoteStreams,
}, initialState);
