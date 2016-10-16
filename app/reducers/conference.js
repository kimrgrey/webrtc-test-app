import lodash from 'lodash';
import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  connecting: false,
  room: null,
  localStream: null,
  members: {},
  remoteStreams: {},
  messages: [],
};

const storeMembers = (state, action) => {
  return { ...state, members: action.payload };
};

const joinRoom = (state, action) => {
  return { ...state, connecting: true };
};

const joinRoomSuccess = (state, action) => {
  const { room, localStream } = action.payload;

  return {
    ...state,
    connecting: false,
    localStream,
    room,
  };
};

const joinRoomFailure = (state, action) => {
  return { ...state, connecting: false };
};

const leaveRoom = (state, action) => {
  return {
    ...state,
    localStream: null,
    room: null,
    members: {},
    remoteStreams: {},
    messages: [],
  };
};

const connectPeer = (state, action) => {
  const client = action.payload;
  const { members } = state;

  return { ...state, members: { ...members, [client.id] : client } };
};

const disconnectPeer = (state, action) => {
  const client = action.payload;
  const { members } = state;

  delete members[client.id];

  return { ...state, members: { ...members } };
};

const handleRemoteStream = (state, action) => {
  const { id, stream } = action.payload;
  const { remoteStreams } = state;

  return { ...state, remoteStreams: { ...remoteStreams, [id] : stream } };
};

const sendMessage = (state, action) => {
  const { sender, text } = action.payload;
  const { messages } = state;

  return { ...state, messages: [ { sender, text }, ...messages ] };
};

const receiveMessage = (state, action) => {
  const { sender, text } = action.payload;
  const { messages } = state;

  return { ...state, messages: [ { sender, text }, ...messages ] };
};

export default composeReducer('conference', {
  joinRoom,
  joinRoomSuccess,
  joinRoomFailure,

  leaveRoom,

  storeMembers,

  connectPeer,
  disconnectPeer,

  handleRemoteStream,

  sendMessage,
  receiveMessage,
}, initialState);
