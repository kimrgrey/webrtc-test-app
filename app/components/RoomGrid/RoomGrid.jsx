import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';

import RoomGridContainer from './RoomGridContainer';
import RoomGridCard from './RoomGridCard';


const RoomGrid = ({ rooms }) => (
  <RoomGridContainer>
    <div className={ classNames('room-grid') }>
      {
        lodash.map(rooms, room => (
          <RoomGridCard key={ room.id } { ...room } />
        ))
      }
    </div>
  </RoomGridContainer>
);

export default RoomGrid;
