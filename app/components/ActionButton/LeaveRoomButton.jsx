import React from 'react';
import ActionButton from './ActionButton';


const LeaveRoomButton = ({ handleClick }) => (
  <ActionButton type={ 'leave-room' } handleClick={ handleClick } />
);

export default LeaveRoomButton;
