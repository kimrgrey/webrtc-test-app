import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchRooms,
  createRoom,
  createRoomSubmit,
  createRoomCancel
} from 'actions/rooms';

import { Content } from 'components/Page';
import Loader from 'components/Loader';
import { RoomGridContainer, RoomGrid } from 'components/RoomGrid';
import { AddRoomButton } from 'components/ActionButton';
import { AddRoomDialog } from 'components/Dialog';

class RoomsPage extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    const { loading, rooms, creatingRoom } = this.props;

    return (
      <Content>
        <Loader enabled={ loading } />

        <AddRoomDialog
          opened={ creatingRoom }
          handleSubmit={ this.props.createRoomSubmit }
          handleCancel={ this.props.createRoomCancel }
        />

        <RoomGridContainer>
          <RoomGrid rooms={ rooms } />
        </RoomGridContainer>

        <AddRoomButton handleClick={ this.props.createRoom } />
      </Content>
    );
  }
}

const mapStateToProps = (state) => state.rooms;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRooms,
    createRoom,
    createRoomSubmit,
    createRoomCancel,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
