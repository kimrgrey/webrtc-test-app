import React from 'react';
import classNames from 'classnames';


const VideoGridContainer = ({ children }) => (
  <div className={ classNames('video-grid-container') }>
    { children }
  </div>
);

export default VideoGridContainer;
