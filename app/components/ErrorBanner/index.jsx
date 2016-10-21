import React from 'react';
import classNames from 'classnames';


const ErrorBanner = ({ enabled, text }) => (
  <div className={ classNames('error-banner', { enabled }) }>
    <h1>{ text }</h1>
  </div>
);

export default ErrorBanner;
