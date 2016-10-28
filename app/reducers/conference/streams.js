import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  remoteStreams: {},
};

const leaveRoom = (state, action) => {
  return {
    ...state,
    remoteStreams: {},
  };
};

const addRemoteStream = (state, action) => {
  const stream = action.payload;
  const { remoteStreams } = state;

  return {
    ...state,
    remoteStreams: {
      ...remoteStreams,
      [stream.id] : stream,
    }
  };
};

const removeRemoteStream = (state, action) => {
  const { id } = action.payload;
  const { remoteStreams } = state;

  delete remoteStreams[id];

  return {
    ...state,
    remoteStreams: {
      ...remoteStreams,
    },
  };
};

export default composeReducer('conference', {
  leaveRoom,
  addRemoteStream,
  removeRemoteStream,
}, initialState);
