import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class RoomDialog extends Component {
  state = {
    valid: false
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this.props.handleCancel }
      />,
      <FlatButton
        label="Submit"
        primary={ true }
        disabled={ !this.state.valid }
        onTouchTap={ this.props.handleSubmit }
      />,
    ];

    return (
      <Dialog
        title="Room"
        actions={ actions }
        modal={ true }
        open={ this.props.open }
      >
        Only actions can close this dialog.
      </Dialog>
    );
  }
}

export default RoomDialog;
