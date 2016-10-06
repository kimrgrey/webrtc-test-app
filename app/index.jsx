import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes.jsx';

import configureStore from 'utils/configureStore';
import configureWebsocket from 'utils/configureWebsocket';

import 'css/global.css'

const store = configureStore();
const websocket = configureWebsocket(store.dispatch);

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
