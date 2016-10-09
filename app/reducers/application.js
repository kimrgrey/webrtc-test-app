import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  id: null,
};

export const fetchId = (state, action) => {
  return { ...state, id: null };
};

export const storeId = (state, action) => {
  return { ...state, id: action.payload };
}

export default composeReducer('application', {
  fetchId,
  storeId,
}, initialState);
