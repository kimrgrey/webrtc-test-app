import { composeReducer } from 'redux-compose-reducer';

const initialState = {};

const storeMembers = (state, action) => {
  const members = action.payload;
  return { ...members };
};

const leaveRoom = (state, action) => {
  return {};
};

const addMember = (state, action) => {
  const member = action.payload;

  return { ...state, [member.id] : member };
};

const removeMember = (state, action) => {
  const member = action.payload;
  const members = state;

  delete members[member.id];

  return { ...members };
};

export default composeReducer('members', {
  storeMembers,
  leaveRoom,
  addMember,
  removeMember,
}, initialState);
