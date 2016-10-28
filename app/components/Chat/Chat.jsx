import React, { Component } from 'react';
import classNames from 'classnames';

import ChatHeader       from './ChatHeader';
import ChatMessageArea  from './ChatMessageArea';
import ChatMessageInput from './ChatMessageInput';


class Chat extends Component {
  render() {
    const { room, members, messages, handleMessageSubmit } = this.props;

    return (
      <div className={ classNames('chat') }>
        <ChatHeader room={ room } members={ members } />
        <ChatMessageArea messages={ messages } />
        <ChatMessageInput handleMessageSubmit={ handleMessageSubmit } />
      </div>
    );
  }
}

export default Chat;
