import React from 'react';
import { Router, Route } from 'react-router';

import Application from 'pages/Application';
import RoomsPage from 'pages/RoomsPage';
import NoMatch from 'pages/NoMatch';


const Routes = ({ history }) => (
  <Router history={ history }>
    <Route component={ Application }>
      <Route path="/" component={ RoomsPage } />
      <Route path="*" component={ NoMatch } />
    </Route>
  </Router>
);

export default Routes;
