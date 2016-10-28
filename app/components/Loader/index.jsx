import React from 'react';
import classNames from 'classnames';


const Loader = () => (
  <div className={ classNames('overlay', 'fit', 'fullsize', 'loader') }></div>
);

export default Loader;
