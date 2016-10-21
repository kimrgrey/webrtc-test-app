import React from 'react';
import classNames from 'classnames';


const Dialog = ({ opened, title, buttons, children }) => (
  <div className={ classNames('dialog', { opened } ) }>
    <div className={ classNames('dialog-overlay') }></div>
    <div className={ classNames('dialog-window') }>
      <div className={ classNames('dialog-window-title') }>
        { title }
      </div>
      <div className={ classNames('dialog-window-content') }>
        { children }
      </div>
      <div className={ classNames('dialog-window-button-box') }>
        { buttons }
      </div>
    </div>
  </div>
);

export default Dialog;
