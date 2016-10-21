import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';

import RoomGridCard from './RoomGridCard';


const RoomGrid = ({ rooms }) => (
  <div className={ classNames('room-grid') }>
    {
      lodash.map(rooms, room => (
        <RoomGridCard key={ room.id } { ...room } />
      ))
    }
  </div>
);

export default RoomGrid;
