import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import application from './application';
import conference from './conference';
import rooms from './rooms';


const rootReducer = combineReducers({
  application,
  conference,
  rooms,
  routing: routerReducer,
});

export default rootReducer;
