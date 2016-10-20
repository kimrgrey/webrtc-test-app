import React from 'react';
import classNames from 'classnames';


const ActionButton = ({ type, handleClick }) => (
  <div className={ classNames('action-button', 'shadow', type) }>
    <button
      className={ classNames('action-button', 'button') }
      onClick={ handleClick }
    >
    </button>
  </div>
);

export default ActionButton;
