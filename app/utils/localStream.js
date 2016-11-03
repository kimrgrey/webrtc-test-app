import config from 'config';
import lodash from 'lodash';


const streams = {};

const getVideo = () => {
  const constraints = config.mediaConstraints;

  return navigator
    .mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      streams[stream.id] = stream;

      return stream;
    })
    .catch(e => {
      console.log(e);
      return null;
    });
};

const getAudio = () => {
  const constraints = {
    ...config.mediaConstraints,
    video: false,
  };

  return navigator
    .mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      streams[stream.id] = stream;

      return stream;
    })
    .catch(e => {
      console.log(e);
      return null;
    });
};

const getLocalVideo = () => {
  const constraints = {
    ...config.mediaConstraints,
    audio: false,
    video: {
      ...config.mediaConstraints.video,
      width: 177,
      height: 100
    }
  };

  return navigator
    .mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      streams[stream.id] = stream;

      return stream;
    })
    .catch(e => {
      console.log(e);
      return null;
    });
};

const close = () => {
  lodash.values(streams).forEach(stream => {
    stream.getTracks().forEach(track => track.stop());
  });
};

export default {
  getVideo,
  getAudio,
  getLocalVideo,
  close,
};
