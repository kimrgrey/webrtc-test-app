import React, { Component } from 'react';
import classNames from 'classnames';


class LocalVideo extends Component {
  shouldComponentUpdate = (nextProps, nextState) => (
    this.props.streamDescription !== nextProps.streamDescription
  );

  videoSource = (stream) => {
    return window.URL ? window.URL.createObjectURL(stream)
                      : stream;
  };

  render() {
    const { hasAudio, hasVideo, audioEnabled, videoEnabled, stream } = this.props.streamDescription;

    return (
      <div className={ classNames('local-stream-card', 'overlay', 'bottom', 'left') }>
        { stream &&
          <video
            className={ classNames('local-stream-card-video') }
            autoPlay
            muted
            src={ this.videoSource(stream) }>
          </video>
        }
      </div>
    );
  }
}

export default LocalVideo;
