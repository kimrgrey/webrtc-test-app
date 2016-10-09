
var streamConstraints = {
  audio: true,
  video: true,
};

const getLocalStream = () => {
  return navigator.mediaDevices.getUserMedia(streamConstraints);
};

const closeLocalStream = (stream) => {
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
  }
};

export default {
  getLocalStream,
  closeLocalStream,
};
