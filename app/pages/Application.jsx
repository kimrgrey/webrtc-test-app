import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from 'components/Loader';


class Application extends Component {
  render() {
    const { id, children } = this.props;

    return id ? children : <Loader />;
  }
}

const mapStateToProps = (state) => state.application;

export default connect(mapStateToProps)(Application);
