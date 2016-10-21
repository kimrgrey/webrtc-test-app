import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  loading: false,
  error: false,
  description: {},
};

const joinRoom = (state, action) => {
  return { ...state, loading: true, error: false };
};

const joinRoomSuccess = (state, action) => {
  const { room } = action.payload;

  return { ...state, loading: false, error: false, description: room };
};

const joinRoomFailure = (state, action) => {
  return { ...state, loading: false, error: true };
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
