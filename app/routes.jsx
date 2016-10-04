import React from 'react';
import { Router, Route } from 'react-router';
import Application from 'pages/Application';
import MainPage from 'pages/MainPage';

const Routes = ({ history }) => (
  <Router history={ history }>
    <Route component={ Application }>
      <Route path="/" component={ MainPage } />
    </Route>
  </Router>
);

export default Routes;
