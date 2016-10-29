import React from 'react';
import classNames from 'classnames';


const VideoGridCardPlaceholder = ({ icon }) => (
  <div className={ classNames('video-grid-card-placeholder') }>
    <div className={
      classNames('video-grid-card-placeholder-icon', 'material-icons',
                 'md-128', 'md-dark', 'md-inactive')
      }>
      { icon }
    </div>
  </div>
);

export default VideoGridCardPlaceholder;
