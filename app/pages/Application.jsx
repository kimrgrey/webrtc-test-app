import React, { Component } from 'react';

import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green500, green700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Page from 'components/Page';
import Progress from 'components/Progress';


class Application extends Component {
  theme() {
    return getMuiTheme({
      palette: {
        primary1Color: green500,
        primary2Color: green700,
      },
    });
  }

  render() {
    const { id, children } = this.props;

    const pageContent = id ? children : <Progress />;

    return (
      <MuiThemeProvider muiTheme={ this.theme() }>
        <Page>
          { pageContent }
        </Page>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => state.application;

export default connect(mapStateToProps)(Application);
