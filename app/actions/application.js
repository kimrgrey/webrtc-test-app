import { createTypes } from 'redux-compose-reducer';
import websocket from 'utils/websocket';
import peersStore from 'utils/peersStore';


const TYPES = createTypes('application', [
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
  return (dispatch) => {
    const { id } = JSON.parse(message);
    dispatch({ type: TYPES.storeId, payload: id });
    peersStore.setLocalId(id);
  };
};
