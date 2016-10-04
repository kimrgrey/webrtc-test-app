import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import rooms from './rooms';

const rootReducer = combineReducers({
  rooms,
  routing: routerReducer
});

export default rootReducer;
