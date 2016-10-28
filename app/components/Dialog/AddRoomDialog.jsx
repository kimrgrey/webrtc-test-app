import React, { Component } from 'react';
import classNames from 'classnames';

import Dialog from './Dialog';
import DialogButton from './DialogButton';


class AddRoomDialog extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', invalid: true };
  }

  clear = () => this.setState({ name: '', invalid: true });

  handleCancel = () => {
    this.props.handleCancel();
    this.clear();
  };

  handleSubmit = () => {
    const { name } = this.state;

    this.props.handleSubmit({ name });
    this.clear();
  };

  handleNameChange = (event) => {
    const name = event.target.value;
    const invalid = name.trim().length === 0;

    this.setState({ name, invalid });
  };

  render() {
    const { opened } = this.props;
    const { name, invalid } = this.state;
    const valid = !invalid;

    const buttons = [
      <DialogButton
        key={ 'cancel' }
        label={ 'CANCEL' }
        disabled={ false }
        handleClick={ this.handleCancel }
      />,
      <DialogButton
        key={ 'submit' }
        label={ 'SUBMIT' }
        disabled={ invalid }
        handleClick={ this.handleSubmit }
      />,
    ];

    return (
      <Dialog
        opened={ opened }
        title={ 'Add Room' }
        buttons={ buttons }
      >
        <input
          className={ classNames('dialog-window-input', { invalid, valid }) }
          id="room-name-input"
          autoFocus
          placeholder={ 'Enter room name' }
          type="text"
          value={ name }
          onChange={ this.handleNameChange }
        />
      </Dialog>
    );
  }
}

export default AddRoomDialog;
