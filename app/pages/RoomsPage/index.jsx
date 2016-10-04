import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRooms } from 'actions/rooms';

import Progress from 'components/Progress';
import RoomsList from 'components/RoomsList';
import RoomsListEmptyBanner from 'components/RoomsListEmptyBanner';

import Styles from './Styles.css';

class RoomsPage extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  roomsView () {
    const { rooms } = this.props;

    return rooms.length ? <RoomsList rooms={ rooms } /> : <RoomsListEmptyBanner />;
  }

  pageContent() {
    const { loading, rooms } = this.props;

    return loading ? <Progress /> : this.roomsView();
  }

  addRoomButton() {
    return (
      <FloatingActionButton className={ Styles.action_button }>
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  render() {
    return (
      <div className={ Styles.container }>
        { this.pageContent() }
        { this.addRoomButton() }
      </div>
    );
  }
}

const mapStateToProps = (state) => state.rooms;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchRooms }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
