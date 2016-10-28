import { combineReducers } from 'redux';

import members     from './members';
import messages    from './messages';
import room        from './room';
import streams     from './streams';
import localStream from './localStream';

export default combineReducers({
  members,
  messages,
  room,
  localStream,
  streams,
});
