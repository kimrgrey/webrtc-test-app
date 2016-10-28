import React from 'react';
import ActionButton from './ActionButton';


const AddRoomButton = ({ handleClick }) => (
  <ActionButton
    types={ [ 'overlay', 'bottom', 'right', 'blue' ] }
    icon={ 'add' }
    handleClick={ handleClick }
    />
);

export default AddRoomButton;
