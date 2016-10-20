import { composeReducer } from 'redux-compose-reducer';

const initialState = [];

const leaveRoom = (state, action) => {
  return [];
};

const addMember = (state, action) => {
  const newMessage = {
    type: 'system',
    text: 'user joined',
  };

  return [ ...state, newMessage ];
};

const removeMember = (state, action) => {
  const newMessage = {
    type: 'system',
    text: 'user left',
  };

  return [ ...state, newMessage ];
};

const sendMessage = (state, action) => {
  const newMessage = action.payload;

  return [ ...state, newMessage ];
};

const receiveMessage = (state, action) => {
  const newMessage = action.payload;

  return [ ...state, newMessage ];
};

export default composeReducer('messages', {
  leaveRoom,
  addMember,
  removeMember,
  sendMessage,
  receiveMessage,
}, initialState);
