import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes.jsx';

import websocket from 'utils/websocket';

import configureStore from 'utils/configureStore';
import configureWebsocket from 'utils/configureWebsocket';

import peersStore from 'utils/peersStore';

import 'css/global.css'

const store = configureStore();

configureWebsocket(websocket, store.dispatch);

peersStore.init(store.dispatch);

injectTapEventPlugin();

const Root = ({ store }) => (
  <Provider store={ store }>
    <Routes history={ syncHistoryWithStore(browserHistory, store) } />
  </Provider>
);

ReactDOM.render(
  <Root store={ store } />,
  document.getElementById('root')
);
