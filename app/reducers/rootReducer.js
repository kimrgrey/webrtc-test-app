import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import rooms from './rooms';
import client from './client';

const rootReducer = combineReducers({
  rooms,
  client,
  routing: routerReducer
});

export default rootReducer;
