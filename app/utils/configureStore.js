import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from 'reducers/rootReducer';

const logger = createLogger();
const router = routerMiddleware(browserHistory);

const configureStore = () => createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    logger,
    router,
  )
);

export default configureStore;
