import config from 'config';

const websocket = io(config.signallingServer);

export default websocket;
