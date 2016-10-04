import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './Styles.css';

class MainPage extends Component {
  render() {
    return (
      <div className={ Styles.parent } />
    );
  }
}

const mapStateToProps = (state) => state.conference;
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps)(MainPage);
