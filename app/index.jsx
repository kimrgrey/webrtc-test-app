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

import 'css/action_button.css'
import 'css/call_timer.css';
import 'css/chat.css'
import 'css/content_placeholder.css'
import 'css/dialog.css'
import 'css/error_banner.css'
import 'css/layout.css'
import 'css/loader.css'
import 'css/local_stream.css'
import 'css/material_icons.css'
import 'css/no_match.css'
import 'css/room_grid.css'
import 'css/video_grid.css'


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
