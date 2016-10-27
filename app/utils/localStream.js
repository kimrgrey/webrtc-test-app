import config from 'config';

const getLocalStream = () => {
  return navigator.mediaDevices.getUserMedia(config.mediaConstraints)
    .catch(e => {
      return navigator.mediaDevices.getUserMedia({
        ...config.mediaConstraints,
        video: false,
      });
    });
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
