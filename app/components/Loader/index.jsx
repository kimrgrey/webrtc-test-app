import React from 'react';
import classNames from 'classnames';


const Loader = ({ enabled }) => (
  <div className={ classNames('loader', { enabled }) }></div>
);

export default Loader;
