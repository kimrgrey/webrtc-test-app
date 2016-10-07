import config from 'config';

const websocket = io(config.serverUrl);

export { websocket };
