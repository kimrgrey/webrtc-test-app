import config from 'config';

const getLocalStream = () => {
  return navigator.mediaDevices.getUserMedia(config.mediaConstraints);
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
