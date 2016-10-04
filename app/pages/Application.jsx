import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green500, green700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Page from 'components/Page';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
  },
});

const Application = ({ children }) => (
  <MuiThemeProvider muiTheme={ muiTheme }>
    <Page>
      { children }
    </Page>
  </MuiThemeProvider>
);

export default Application;
