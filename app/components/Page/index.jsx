import React from 'react';
import classNames from 'classnames';


const Page = ({ children }) => (
  <div className={ classNames('page') }>
    { children }
  </div>
);

export default Page;
