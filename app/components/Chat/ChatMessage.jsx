import React from 'react';
import classNames from 'classnames';


const ChatMessage = ({ type, text }) => (
  <div className={ classNames('chat-message-message', type) }>
    { text }
  </div>
);

export default ChatMessage;
