import React from 'react';
import classNames from 'classnames';


const RoomGridContainer = ({ children }) => (
  <div className={ classNames('scroll') }>
    { children }
  </div>
);

export default RoomGridContainer;
