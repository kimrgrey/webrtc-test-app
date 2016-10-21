import { combineReducers } from 'redux';

import members  from './members';
import messages from './messages';
import room     from './room';
import streams  from './streams';

export default combineReducers({
  members,
  messages,
  room,
  streams,
});
