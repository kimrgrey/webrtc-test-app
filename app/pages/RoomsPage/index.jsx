import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchRooms,
  createRoom,
  createRoomSubmit,
  createRoomCancel
} from 'actions/rooms';

import   Loader          from 'components/Loader';
import   ErrorBanner     from 'components/ErrorBanner';
import   ContentPlaceholder from 'components/ContentPlaceholder';
import   RoomGrid        from 'components/RoomGrid';
import   Workspace       from 'components/Workspace';
import   Page            from 'components/Page';
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
      <Page>
        { error &&
          <ErrorBanner text={ 'Room List Loading Error' } />
        }

        { loading &&
          <Loader />
        }

        { !error &&
          <Workspace>
            { rooms.length === 0 &&
              <ContentPlaceholder
                icon={ roomGridEmpty }
                text={ 'No Rooms' }
                light
              />
            }

            { rooms.length > 0 &&
              <RoomGrid rooms={ rooms } />
            }

            <AddRoomButton handleClick={ this.props.createRoom } />
          </Workspace>
        }

        { creatingRoom &&
          <AddRoomDialog
            opened
            handleSubmit={ this.props.createRoomSubmit }
            handleCancel={ this.props.createRoomCancel }
          />
        }
      </Page>
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
