import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';

import VideoGridContainer from './VideoGridContainer';
import VideoGridCard from './VideoGridCard';


const VideoGrid = ({ streams, children }) => (
  <VideoGridContainer>
    <div className={ classNames('grid', 'center', 'video-grid') }>
      {
        lodash.map(streams, ({ id, stream }) => (
          <VideoGridCard key={ id } stream={ stream } />
        ))
      }
    </div>
  </VideoGridContainer>
);

export default VideoGrid;
