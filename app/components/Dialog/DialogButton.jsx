import React from 'react';
import classNames from 'classnames';


const DialogButton = ({ label, disabled, handleClick }) => (
  <button
    className={ classNames('dialog-window-button') }
    disabled={ disabled }
    onClick={ handleClick }
  >
    { label }
  </button>
);

export default DialogButton;
