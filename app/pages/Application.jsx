import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Application extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Application;
