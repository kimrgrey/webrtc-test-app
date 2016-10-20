import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Page } from 'components/Page';
import Loader from 'components/Loader';


class Application extends Component {
  render() {
    const { id, children } = this.props;

    const content = id ? children : undefined;

    return (
      <Page>
        <Loader enabled={ id === null } />
        { content }
      </Page>
    );
  }
}

const mapStateToProps = (state) => state.application;

export default connect(mapStateToProps)(Application);
