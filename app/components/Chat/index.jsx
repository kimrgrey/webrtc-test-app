import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import lodash from 'lodash';
import Styles from './Styles.css';


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleMessageChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleMessageSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { messages } = this.props;

    const messageBoxes = lodash.map(messages, (m, index) => {
      return (
        <div key={ index } className={ Styles.message }>{ m.text }</div>
      );
    });

    return (
      <div className={ Styles.container }>
        <div className={ Styles.messages }>
          { messageBoxes }
        </div>
        <form
          className={ Styles.inputContainer }
          onSubmit={ this.handleMessageSubmit }
        >
          <TextField
            id={ 'message-input-field' }
            className={ Styles.input }
            value={ this.state.value }
            onChange={ this.handleMessageChange }
          />
        <button className={ Styles.button } type={ 'submit' }>Send</button>
        </form>
      </div>
    );
  }
}

export default Chat;
