import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';

import VideoGridCard from './VideoGridCard';


const VideoGrid = ({ streams, children }) => (
  <div className={ classNames('video-grid') }>
    {
      lodash.map(streams, ({ id, stream }) => (
        <VideoGridCard key={ id } stream={ stream } />
      ))
    }
  </div>
);

export default VideoGrid;
