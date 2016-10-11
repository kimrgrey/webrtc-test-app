import config from 'config';

const injectSocketIo = (callback) => {
  var script = document.createElement('script');

  script.onload = () => {
    callback();
  };
  script.src = config.apiUrl + "/socket.io/socket.io.js";

  document.getElementsByTagName('head')[0].appendChild(script);
};

module.exports = injectSocketIo;
