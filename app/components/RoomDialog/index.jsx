import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Styles from './Styles.css';


class RoomDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      valid: false,
    };
  }

  clear = () => this.setState({ name: '', valid: false });

  handleNameChange = (event) => {
    const name = event.target.value;
    const valid = name.trim().length > 0;
    this.setState({ name, valid });
  };

  handleCancel = () => {
    this.props.onCancel();
    this.clear();
  };

  handleSubmit = () => {
    const { name } = this.state;

    this.props.onSubmit({ name });
    this.clear();
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this.handleCancel }
      />,
      <FlatButton
        label="Submit"
        primary={ true }
        disabled={ !this.state.valid }
        onTouchTap={ this.handleSubmit }
      />,
    ];

    return (
      <Dialog
        bodyClassName= { Styles.roomDialog }
        contentClassName={ Styles.roomDialogContent }
        title={ 'New Room' }
        actions={ actions }
        modal={ true }
        open={ this.props.open }
      >
        <div>
          <TextField
            floatingLabelText={ 'Enter Room Name' }
            errorText={ this.state.valid ? '' : 'room name can not be empty' }
            value={ this.state.name }
            onChange={ this.handleNameChange }
          />
        </div>
      </Dialog>
    );
  }
}

export default RoomDialog;
