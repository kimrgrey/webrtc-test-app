import React from 'react';
import ActionButton from './ActionButton';


const LeaveRoomButton = ({ handleClick }) => (
  <ActionButton type={ 'leave-room' } icon={ 'call_end' } handleClick={ handleClick } />
);

export default LeaveRoomButton;
