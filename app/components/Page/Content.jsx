import React from 'react';
import classNames from 'classnames';


const Content = ({ children }) => (
  <div className={ classNames('content') }>
    { children }
  </div>
);

export default Content;
