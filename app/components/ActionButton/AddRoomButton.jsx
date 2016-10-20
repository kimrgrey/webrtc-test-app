import React from 'react';
import ActionButton from './ActionButton';


const AddRoomButton = ({ handleClick }) => (
  <ActionButton type={ 'add-room' } handleClick={ handleClick } />
);

export default AddRoomButton;
