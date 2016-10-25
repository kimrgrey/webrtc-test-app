import React, { Component } from 'react';
import classNames from 'classnames';


class ChatMessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleMessageSubmit = (event) => {
    event.preventDefault();

    const { message } = this.state;

    if (message.trim().length) {
      this.props.handleMessageSubmit(message);
    }

    this.setState({ message: '' });
  };

  render() {
    const { message } = this.state;

    return (
      <div className={ classNames('chat-message-input-container') }>
        <form
          className={ classNames('chat-message-input-form') }
          onSubmit={ this.handleMessageSubmit }
        >
          <input
            className={ classNames('chat-message-input') }
            type="text"
            autoFocus
            value={ message }
            onChange={ this.handleMessageChange }
          />
          <button
            className={ classNames('chat-message-input-button') }
            type="submit"
          >
          </button>
        </form>
      </div>
    );
  }
}

export default ChatMessageInput;
