import React, { Component } from 'react';
import classNames from 'classnames';

import VideoGridCardPlaceholder from './VideoGridCardPlaceholder';
import VideoGridCardMedia       from './VideoGridCardMedia';
import VideoGridCardFooter      from './VideoGridCardFooter';


class VideoGridCard extends Component {
  videoSource = (stream) => {
    return window.URL ? window.URL.createObjectURL(stream)
                      : stream;
  };

  render() {
    const { streamDescription } = this.props;

    const loading = streamDescription &&
                    streamDescription.loading;

    const hasVideo = streamDescription &&
                     streamDescription.hasVideo &&
                     streamDescription.videoEnabled;

    const audioEnabled = streamDescription &&
                         streamDescription.hasAudio &&
                         streamDescription.audioEnabled;
    const videoEnabled = streamDescription &&
                         streamDescription.hasVideo &&
                         streamDescription.videoEnabled;

    return (
      <div className={ classNames('grid-item', 'video-grid-card') }>
        { loading &&
          <VideoGridCardPlaceholder icon={ 'hourglass empty' } />
        }

        { !loading && !hasVideo &&
          <VideoGridCardPlaceholder icon={ 'person' } />
        }

        { !loading && hasVideo &&
          <VideoGridCardMedia stream={ streamDescription.stream } />
        }

        { !loading &&
          <VideoGridCardFooter
            audioEnabled={ audioEnabled }
            videoEnabled={ videoEnabled }
          />
        }
      </div>
    );
  }
}

export default VideoGridCard;
