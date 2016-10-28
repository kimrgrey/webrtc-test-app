import React from 'react';
import ActionButton from './ActionButton';


const LeaveRoomButton = ({ handleClick }) => (
  <ActionButton
    types={ [ 'overlay', 'bottom', 'right', 'red' ] }
    icon={ 'call_end' }
    handleClick={ handleClick }
    />
);

export default LeaveRoomButton;
