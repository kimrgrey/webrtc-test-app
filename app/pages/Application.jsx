import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchId } from 'actions/application';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green500, green700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Page from 'components/Page';


class Application extends Component {
  componentDidMount() {
    if (this.props.id === null) {
      this.props.fetchId();
    }
  }

  theme() {
    return getMuiTheme({
      palette: {
        primary1Color: green500,
        primary2Color: green700,
      },
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ this.theme() }>
        <Page>
          { this.props.children }
        </Page>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => state.application;
const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Application);
