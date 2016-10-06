import { createTypes } from 'redux-compose-reducer';


const TYPES = createTypes('client', [
  'storeId',
]);

export const storeId = (message) => (
  { type: TYPES.storeId, payload: JSON.parse(message) }
);
