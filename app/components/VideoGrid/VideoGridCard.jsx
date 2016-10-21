import React from 'react';
import classNames from 'classnames';


const videoSource = (stream) => {
  return window.URL ? window.URL.createObjectURL(stream)
                    : stream;
};

const VideoGridCard = ({ stream }) => (
  <div className={ classNames('video-grid-card') }>
    <video
      className={ classNames('video-grid-card-video') }
      autoPlay={ true }
      src={ videoSource(stream) }>
    </video>
  </div>
);

export default VideoGridCard;
