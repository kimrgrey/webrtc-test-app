import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  joinRoom,
  leaveRoom,
  leaveRoomWithRedirect,
  sendMessage,
} from 'actions/conference';

class ConferencePage extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { application, conference } = state;
  return { application, conference };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    joinRoom,
    leaveRoom,
    leaveRoomWithRedirect,
    sendMessage,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
