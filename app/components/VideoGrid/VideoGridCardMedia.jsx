import React, { Component } from 'react';
import classNames from 'classnames';


class VideoGridCardMedia extends Component {
  shouldComponentUpdate = (nextProps, nextState) => (
    this.props.stream !== nextProps.stream
  )

  videoSource = (stream) => {
    return window.URL ? window.URL.createObjectURL(stream)
                      : stream;
  };

  render() {
    const { stream } = this.props;
    return (
      <video
        className={ classNames('video-grid-card-video') }
        autoPlay
        src={ this.videoSource(stream) }>
      </video>
    );
  }
}

export default VideoGridCardMedia;
