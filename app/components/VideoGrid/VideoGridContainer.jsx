import React from 'react';
import classNames from 'classnames';


const VideoGridContainer = ({ children }) => (
  <div className={ classNames('scroll') }>
    { children }
  </div>
);

export default VideoGridContainer;
