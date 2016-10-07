import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import rooms from './rooms';
import client from './client';
import conference from './conference';


const rootReducer = combineReducers({
  rooms,
  client,
  conference,
  routing: routerReducer,
});

export default rootReducer;
