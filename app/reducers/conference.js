import { combineReducers } from 'redux';
import { members, messages, room, streams } from './conference/';

const conference = combineReducers({
  members,
  messages,
  room,
  streams,
});

export default conference;
