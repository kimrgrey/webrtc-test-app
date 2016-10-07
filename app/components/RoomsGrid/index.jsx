import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import AvVideoCall from 'material-ui/svg-icons/av/video-call';
import lodash from 'lodash';
import Styles from './Styles.css';


class RoomsGrid extends Component {
  handleRoomJoin = (room) => {
    this.props.onJoinRoom(room);
  };

  render() {
    const { rooms } = this.props;

    const tiles = lodash.map(rooms, (r) => (
      <GridTile
        key={ r.id }
        title={ r.name }
        subtitle={ 'room url' }
        titlePosition={ 'top' }
        actionIcon={
          <IconButton
            tooltip={ 'Join Room' }
            tooltipPosition={ 'bottom-left' }
            onTouchTap={ () => this.handleRoomJoin(r) }
          >
            <AvVideoCall color= { 'white' } />
          </IconButton>
        }
      >
        <div className={ Styles.avatar } />
      </GridTile>
    ));

    return (
      <div className={ Styles.root }>
        <GridList
          cols={ 4 }
          cellHeight={ 300 }
          className={ Styles.grid }
        >
          { tiles }
        </GridList>
      </div>
    );
  }
}

export default RoomsGrid;
