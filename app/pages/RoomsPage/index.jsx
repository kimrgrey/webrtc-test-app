import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchRooms,
  createRoom,
  createRoomSubmit,
  createRoomCancel
} from 'actions/rooms';

import Banner from 'components/Banner';
import Progress from 'components/Progress';
import RoomsGrid from 'components/RoomsGrid';
import RoomDialog from 'components/RoomDialog';

import Styles from './Styles.css';

class RoomsPage extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  roomsView () {
    const { rooms } = this.props;

    return rooms.length ? <RoomsGrid rooms={ rooms } /> : <Banner text={ 'NO ROOMS' }/>;
  }

  roomDialog() {
    return (
      <RoomDialog
        open={ this.props.creatingRoom }
        onSubmit={ this.props.createRoomSubmit }
        onCancel={ this.props.createRoomCancel }
      />
    );
  }

  pageContent() {
    const { loading, rooms } = this.props;

    return loading ? <Progress /> : this.roomsView();
  }

  addRoomButton() {
    return (
      <FloatingActionButton
        className={ Styles.action_button }
        onTouchTap={ this.props.createRoom }
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  render() {
    return (
      <div className={ Styles.container }>
        { this.pageContent() }
        { this.addRoomButton() }
        { this.roomDialog() }
      </div>
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
