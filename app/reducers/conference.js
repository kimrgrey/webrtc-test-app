import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  root: undefined
};

export default composeReducer('conference', {}, initialState);
