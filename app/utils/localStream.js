
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

var streamConstraints = {
  audio: true,
  video: true,
};

const getLocalStream = () => {
  return new Promise((resolve, reject) => {
    navigator.getUserMedia(streamConstraints, resolve, reject);
  });
};

export default { getLocalStream };
