import React from 'react';
import classNames from 'classnames';


const Workspace = ({ children }) => (
  <div className={ classNames('workspace') }>
    { children }
  </div>
);

export default Workspace;
