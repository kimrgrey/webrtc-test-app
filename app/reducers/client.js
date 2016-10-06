import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  id: '',
};

export const storeId = (state, action) => {
  const { id } = action.payload;
  return { ...state, id };
}

export default composeReducer('client', {
  storeId,
}, initialState);
