import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';


class ChatMessage extends Component {
  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  render() {
    const { type, text } = this.props;

    return (
      <div className={ classNames('chat-message-message', type) }>
        { text }
      </div>
    );
  }
}

export default ChatMessage;
