import { composeReducer } from 'redux-compose-reducer';

const initialState = {};

const leaveRoom = (state, action) => {
  return {};
};

const addRemoteStream = (state, action) => {
  const { id, stream } = action.payload;

  const hasAudio = stream && stream.getAudioTracks().length > 0;
  const hasVideo = stream && stream.getVideoTracks().length > 0;

  const audioTrack = hasAudio ? stream.getAudioTracks()[0] : null;
  const videoTrack = hasAudio ? stream.getVideoTracks()[0] : null;

  const audioEnabled = audioTrack ? audioTrack.enabled : false;
  const videoEnabled = videoTrack ? videoTrack.enabled : false;

  return {
    ...state,
    [id] : {
      hasAudio,
      hasVideo,
      audioEnabled,
      videoEnabled,
      stream,
    }
  };
};

const removeRemoteStream = (state, action) => {
  const { id } = action.payload;

  delete state[id];

  return { ...state };
};

export default composeReducer('conference', {
  leaveRoom,
  addRemoteStream,
  removeRemoteStream,
}, initialState);
