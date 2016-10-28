import React from 'react';
import classNames from 'classnames';


const ErrorBanner = ({ text }) => (
  <div className={ classNames('overlay', 'fit', 'fullsize', 'error-banner') }>
    <h1>{ text }</h1>
  </div>
);

export default ErrorBanner;
