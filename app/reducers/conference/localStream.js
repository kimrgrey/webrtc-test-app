import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  hasAudio: false,
  hasVideo: false,
  audioEnabled: false,
  videoEnabled: false,
  stream: null,
};

const joinRoomSuccess = (state, action) => {
  const { stream } = action.payload;

  const hasAudio = stream && stream.getAudioTracks().length > 0;
  const hasVideo = stream && stream.getVideoTracks().length > 0;

  const audioTrack = hasAudio ? stream.getAudioTracks()[0] : null;
  const videoTrack = hasAudio ? stream.getVideoTracks()[0] : null;

  const audioEnabled = audioTrack ? audioTrack.enabled : false;
  const videoEnabled = videoTrack ? videoTrack.enabled : false;

  return {
    ...state,
    hasAudio,
    hasVideo,
    audioEnabled,
    videoEnabled,
    stream,
  };
};

const leaveRoom = (state, action) => {
  return {
    ...state,
    hasAudio: false,
    hasVideo: false,
    audioEnabled: false,
    videoEnabled: false,
    stream: null,
  };
};

const toggleAudio = (state, action) => {
  const { on } = action.payload;
  const { hasAudio, stream } = state;

  if (hasAudio && stream) {
    stream.getAudioTracks()[0].enabled = on;
  }

  return { ...state, audioEnabled: on };
};

const toggleVideo = (state, action) => {
  const { on } = action.payload;
  const { hasVideo, stream } = state;

  if (hasVideo && stream) {
    stream.getVideoTracks()[0].enabled = on;
  }

  return { ...state, videoEnabled: on };
};

export default composeReducer('conference', {
  joinRoomSuccess,
  leaveRoom,
  toggleAudio,
  toggleVideo,
}, initialState);
