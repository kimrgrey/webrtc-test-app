import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import conference from './conference';

const rootReducer = combineReducers({
  conference,
  routing: routerReducer
});

export default rootReducer;
