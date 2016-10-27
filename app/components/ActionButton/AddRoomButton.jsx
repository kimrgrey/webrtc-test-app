import React from 'react';
import ActionButton from './ActionButton';


const AddRoomButton = ({ handleClick }) => (
  <ActionButton
    types={ [ 'add-room', 'controls', 'bottom', 'right' ] }
    icon={ 'add' }
    handleClick={ handleClick }
    />
);

export default AddRoomButton;
