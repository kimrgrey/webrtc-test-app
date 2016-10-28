import React from 'react';
import classNames from 'classnames';


const SideBar = ({ type, open, children }) => (
  <div className={ classNames('sidebar', { open, close: !open }, type) }>
    { children }
  </div>
);

export default SideBar;
