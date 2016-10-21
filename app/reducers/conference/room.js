import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  loading: false,
  description: {},
};

const joinRoom = (state, action) => {
  return { ...state, loading: true };
};

const joinRoomSuccess = (state, action) => {
  const { room } = action.payload;

  return { ...state, loading: false, description: room };
};

const joinRoomFailure = (state, action) => {
  return { ...state, loading: false };
};

const leaveRoom = (state, action) => {
  return { ...state, description: {} };
};

export default composeReducer('conference', {
  joinRoom,
  joinRoomSuccess,
  joinRoomFailure,
  leaveRoom,
}, initialState);
