import React, { Component } from 'react';
import classNames from 'classnames';
import { map } from 'lodash';

import ChatMessage from './ChatMessage';


class ChatMessageArea extends Component {
  render() {
    const { messages } = this.props;

    return (
      <div className={ classNames('chat-message-area') }>
        <div className={ classNames('chat-message-content') }>
          {
            map(messages, (message, index) => (
              <ChatMessage key={ index } { ...message } />
            ))
          }
        </div>
      </div>
    );
  }
}

export default ChatMessageArea;
