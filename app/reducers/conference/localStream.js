import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  hasAudio: false,
  hasVideo: false,
  audioEnabled: false,
  videoEnabled: false,
  mainStream: null,
  previewStream: null,
};

const joinRoomSuccess = (state, action) => {
  const { mainStream, previewStream } = action.payload;

  const hasAudio = mainStream && mainStream.getAudioTracks().length > 0;
  const hasVideo = mainStream && mainStream.getVideoTracks().length > 0;

  const audioTrack = hasAudio ? mainStream.getAudioTracks()[0] : null;
  const videoTrack = hasAudio ? mainStream.getVideoTracks()[0] : null;

  const audioEnabled = audioTrack ? audioTrack.enabled : false;
  const videoEnabled = videoTrack ? videoTrack.enabled : false;

  return {
    ...state,
    hasAudio,
    hasVideo,
    audioEnabled,
    videoEnabled,
    mainStream,
    previewStream,
  };
};

const leaveRoom = (state, action) => {
  return {
    ...state,
    hasAudio: false,
    hasVideo: false,
    audioEnabled: false,
    videoEnabled: false,
    mainStream: null,
    previewStream: null,
  };
};

const toggleAudio = (state, action) => {
  const { on } = action.payload;
  const { hasAudio, mainStream } = state;

  if (hasAudio && mainStream) {
    mainStream.getAudioTracks()[0].enabled = on;
  }

  return { ...state, audioEnabled: on };
};

const toggleVideo = (state, action) => {
  const { on } = action.payload;
  const { hasVideo, mainStream } = state;

  if (hasVideo && mainStream) {
    mainStream.getVideoTracks()[0].enabled = on;
  }

  return { ...state, videoEnabled: on };
};

export default composeReducer('conference', {
  joinRoomSuccess,
  leaveRoom,
  toggleAudio,
  toggleVideo,
}, initialState);
