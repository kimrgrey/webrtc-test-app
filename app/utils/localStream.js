
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

var streamConstraints = {
  audio: false,
  video: true,
};

const getLocalStream = () => {
  return new Promise((resolve, reject) => {
    navigator.getUserMedia(streamConstraints, resolve, reject);
  });
};

export default { getLocalStream };
