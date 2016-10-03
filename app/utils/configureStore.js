import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from 'reducers/rootReducer';

const configureStore = () => createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    createLogger(),
    routerMiddleware(browserHistory),
  )
);

export default configureStore;
