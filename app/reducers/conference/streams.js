import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  localStream: null,
  remoteStreams: {},
};

const joinRoomSuccess = (state, action) => {
  const { localStream } = action.payload;

  return { ...state, localStream };
};

const leaveRoom = (state, action) => {
  return {
    ...state,
    localStream: null,
    remoteStreams: {},
  };
};

const addRemoteStream = (state, action) => {
  const { id, stream } = action.payload;
  const { remoteStreams } = state;

  return {
    ...state,
    remoteStreams: {
      ...remoteStreams,
      [id] : stream,
    }
  };
};

const removeRemoteStream = (state, action) => {
  const { id } = action.payload;
  const { remoteStreams } = state;

  delete remoteStream[id];

  return {
    ...state,
    remoteStreams: {
      ...remoteStreams,
    },
  };
};

export default composeReducer('streams', {
  joinRoomSuccess,
  leaveRoom,
  addRemoteStream,
  removeRemoteStream,
}, initialState);
