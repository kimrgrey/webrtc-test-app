import config from 'config';

const injectSocketIo = (callback) => {
  var script = document.createElement('script');

  script.onload = () => {
    console.log('socket.io loaded');
    callback();
  };
  script.src = config.serverUrl + "/socket.io/socket.io.js";

  document.getElementsByTagName('head')[0].appendChild(script);
};

module.exports = injectSocketIo;
