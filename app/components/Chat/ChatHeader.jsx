import React from 'react';
import classNames from 'classnames';


const ChatHeader = ({ room, members }) => (
  <div className={ classNames('chat-header-area') }>
    <p>{ room.description.name }</p>
  </div>
);

export default ChatHeader;
