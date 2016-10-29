import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';

import VideoGridContainer from './VideoGridContainer';
import VideoGridCard from './VideoGridCard';


const VideoGrid = ({ members, streamDescriptions }) => (
  <VideoGridContainer>
    <div className={ classNames('grid', 'center', 'video-grid') }>
      {
        lodash.map(members, ({id}) => (
          <VideoGridCard key={ id } streamDescription={ streamDescriptions[id] } />
        ))
      }
    </div>
  </VideoGridContainer>
);

export default VideoGrid;
