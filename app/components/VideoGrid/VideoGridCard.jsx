import React, { Component } from 'react';
import classNames from 'classnames';

import VideoGridCardPlaceholder from './VideoGridCardPlaceholder';
import VideoGridCardFooter      from './VideoGridCardFooter';


class VideoGridCard extends Component {
  shouldComponentUpdate = (nextProps, nextState) => (
    this.props.streamDescription !== nextProps.streamDescription
  );

  videoSource = (stream) => {
    return window.URL ? window.URL.createObjectURL(stream)
                      : stream;
  };

  render() {
    const { streamDescription } = this.props;

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
        { !hasVideo &&
          <VideoGridCardPlaceholder icon={ 'person' } />
        }

        { hasVideo &&
          <video
            className={ classNames('video-grid-card-video') }
            autoPlay
            src={ this.videoSource(streamDescription.stream) }>
          </video>
        }

        <VideoGridCardFooter
          audioEnabled={ audioEnabled }
          videoEnabled={ videoEnabled }
        />
      </div>
    );
  }
}

export default VideoGridCard;
