import React from 'react';
import classNames from 'classnames';


const RoomGridContainer = ({ children }) => (
  <div className={ classNames('room-grid-container') }>
    { children }
  </div>
);

export default RoomGridContainer;
