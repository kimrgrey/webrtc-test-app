import React from 'react';
import classNames from 'classnames';


const ContentPlaceholder = ({ icon, text, dark, light }) => (
  <div className={ classNames('content-placeholder', { dark, light }) }>
    <img
      className={ classNames('content-placeholder-icon') }
      src={ icon }
    >
    </img>
    <span className={ classNames('content-placeholder-caption') }>
      { text }
    </span>
  </div>
);

export default ContentPlaceholder;
