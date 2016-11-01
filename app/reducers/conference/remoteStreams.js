import { composeReducer } from 'redux-compose-reducer';

const initialState = {};

const addRemoteConnection = (state, action) => {
  const { id } = action.payload;

  return {
    ...state,
    [id] : {
      loading: true,
      hasAudio: false,
      hasVideo: false,
      audioEnabled: false,
      videoEnabled: false,
      stream: null,
    }
  };
};

const updateRemoteConnection = (state, action) => {
  const connectionParams = action.payload;
  const connection = state[connectionParams.id];

  const {
    loading = connection.loading,
    stream = connection.stream
  } = connectionParams;

  const hasAudio = stream && stream.getAudioTracks().length > 0;
  const hasVideo = stream && stream.getVideoTracks().length > 0;

  const audioTrack = hasAudio ? stream.getAudioTracks()[0] : null;
  const videoTrack = hasAudio ? stream.getVideoTracks()[0] : null;

  const audioEnabled = audioTrack ? audioTrack.enabled : false;
  const videoEnabled = videoTrack ? videoTrack.enabled : false;

  return {
    ...state,
    [connectionParams.id]: {
      ...connection,
      loading,
      hasAudio,
      hasVideo,
      audioEnabled,
      videoEnabled,
      stream,
    }
  };
};

const removeRemoteConnection = (state, action) => {
  const { id } = action.payload;

  delete state[id];

  return { ...state };
};

const toggleRemoteAudio = (state, action) => {
  const { sender, on } = action.payload;

  return {
    ...state,
    [sender]: {
      ...state[sender],
      audioEnabled: on,
    }
  };
};

const toggleRemoteVideo = (state, action) => {
  const { sender, on } = action.payload;

  return {
    ...state,
    [sender]: {
      ...state[sender],
      videoEnabled: on,
    }
  };
};

export default composeReducer('conference', {
  addRemoteConnection,
  updateRemoteConnection,
  removeRemoteConnection,
  toggleRemoteAudio,
  toggleRemoteVideo,
}, initialState);
