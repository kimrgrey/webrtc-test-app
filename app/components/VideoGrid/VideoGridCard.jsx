import React, { Component } from 'react';
import classNames from 'classnames';


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
        { streamDescription &&
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
