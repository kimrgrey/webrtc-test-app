import React, { Component } from 'react';
import classNames from 'classnames';

import VideoGridCardPlaceholder from './VideoGridCardPlaceholder';


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

    return (
      <div className={ classNames('grid-item', 'video-grid-card') }>
        { !streamDescription &&
          <VideoGridCardPlaceholder icon={ 'hourglass empty' } />
        }

        { streamDescription && !streamDescription.hasAudio && !streamDescription.hasVideo &&
          <VideoGridCardPlaceholder icon={ 'chat' } />
        }

        { streamDescription && streamDescription.hasAudio && !streamDescription.hasVideo &&
          <VideoGridCardPlaceholder icon={ 'mic' } />
        }

        { streamDescription && streamDescription.hasVideo &&
          <video
            className={ classNames('video-grid-card-video') }
            autoPlay
            src={ this.videoSource(streamDescription.stream) }>
          </video>
        }
      </div>
    );
  }
}

export default VideoGridCard;
