import { combineReducers } from 'redux';

import members       from './members';
import messages      from './messages';
import room          from './room';
import remoteStreams from './remoteStreams';
import localStream   from './localStream';

export default combineReducers({
  members,
  messages,
  room,
  localStream,
  remoteStreams,
});
