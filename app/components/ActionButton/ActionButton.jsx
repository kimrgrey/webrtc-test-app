import React from 'react';
import classNames from 'classnames';


const ActionButton = ({ types, icon, handleClick }) => (
  <div className={ classNames('action-button', 'shadow', ...types) }>
    <div
      className={ classNames('action-button', 'button') }
      onClick={ handleClick }
    >
    </div>
    <span className={ classNames('action-button-icon', 'material-icons', 'md-36', 'md-light') }>
      { icon }
    </span>
  </div>
);

export default ActionButton;
