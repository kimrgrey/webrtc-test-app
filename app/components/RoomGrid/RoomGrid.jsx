import React from 'react';
import classNames from 'classnames';


const RoomGrid = ({ children }) => (
  <div className={ classNames('room-grid') }>
    { children }
  </div>
);

export default RoomGrid;
