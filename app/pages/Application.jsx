import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Page from 'components/Page';

const Application = ({ children }) => (
  <MuiThemeProvider>
    <Page>
      { children }
    </Page>
  </MuiThemeProvider>
);

export default Application;
