import React from 'react';
import classNames from 'classnames';


const VideoGridCardFooter = ({ audioEnabled, videoEnabled }) => (
  <div className={
      classNames('video-grid-card-footer', audioEnabled && videoEnabled ? 'hidden' : '')
    }>
    { !audioEnabled &&
      <div className={
        classNames('material-icons', 'md-18', 'md-light')
        }>
        mic_off
      </div>
    }
    { !videoEnabled  &&
      <div className={
        classNames('material-icons', 'md-18', 'md-light')
        }>
        videocam_off
      </div>
    }
  </div>

);

export default VideoGridCardFooter;
