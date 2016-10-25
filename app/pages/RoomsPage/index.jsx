import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchRooms,
  createRoom,
  createRoomSubmit,
  createRoomCancel
} from 'actions/rooms';

import { Content }       from 'components/Page';
import   Loader          from 'components/Loader';
import   ErrorBanner     from 'components/ErrorBanner';
import   ContentPlaceholder from 'components/ContentPlaceholder';
import   RoomGrid        from 'components/RoomGrid';
import { AddRoomButton } from 'components/ActionButton';
import { AddRoomDialog } from 'components/Dialog';

import roomGridEmpty from '../../images/room-grid-empty.svg';


class RoomsPage extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    const { error, loading, rooms, creatingRoom } = this.props;

    return (
      <Content>
        { error &&
          <ErrorBanner enabled text={ 'Room List Loading Error' } />
        }
        { loading &&
          <Loader enabled />
        }
        { creatingRoom &&
          <AddRoomDialog
            opened
            handleSubmit={ this.props.createRoomSubmit }
            handleCancel={ this.props.createRoomCancel }
          />
        }
        { rooms.length === 0 &&
          <ContentPlaceholder icon={ roomGridEmpty } text={ 'No Rooms' } />
        }
        { rooms.length > 0 &&
          <RoomGrid rooms={ rooms } />
        }
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
