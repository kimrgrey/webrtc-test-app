import { createTypes } from 'redux-compose-reducer';
import websocket from 'utils/websocket';


const TYPES = createTypes('client', [
  'fetchId',
  'storeId',
]);

export const fetchId = () => {
  return (dispatch) => {
    dispatch({ type: TYPES.fetchId });
    websocket.emit('register');
  };
};

export const storeId = (message) => {
  return { type: TYPES.storeId, payload: JSON.parse(message) };
};
