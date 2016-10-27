import React from 'react';
import ActionButton from './ActionButton';


const LeaveRoomButton = ({ handleClick }) => (
  <ActionButton
    types={ [ 'leave-room', 'controls', 'bottom', 'right' ] }
    icon={ 'call_end' }
    handleClick={ handleClick }
    />
);

export default LeaveRoomButton;
