import React from 'react';
import classNames from 'classnames';

import ChatMessageArea  from './ChatMessageArea';
import ChatMessageInput from './ChatMessageInput';


const Chat = ({ messages, handleMessageSubmit }) => (
  <div className={ classNames('chat') }>
    <ChatMessageArea messages={ messages } />
    <ChatMessageInput handleMessageSubmit={ handleMessageSubmit } />
  </div>
);

export default Chat;
