import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import Routes from './routes.jsx';

import { fetchId } from 'actions/application';

import injectSocketIo from 'utils/injectSocketIo';
import websocket from 'utils/websocket';

import configureStore from 'utils/configureStore';
import configureWebsocket from 'utils/configureWebsocket';

import peersStore from 'utils/peersStore';

import 'css/global.css'

const store = configureStore();

injectSocketIo(() => {
  configureWebsocket(websocket(), store.dispatch);
  store.dispatch(fetchId());
});

peersStore.init(store.dispatch);

const Root = ({ store }) => (
  <Provider store={ store }>
    <Routes history={ syncHistoryWithStore(browserHistory, store) } />
  </Provider>
);

ReactDOM.render(
  <Root store={ store } />,
  document.getElementById('root')
);
