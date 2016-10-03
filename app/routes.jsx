import React from 'react';
import { Router, Route } from 'react-router';
import Application from 'pages/Application';
import WelcomePage from 'pages/WelcomePage';

const Routes = ({ history }) => (
  <Router history={ history }>
    <Route component={ Application }>
      <Route path="/" component={ WelcomePage } />
    </Route>
  </Router>
);

export default Routes;
