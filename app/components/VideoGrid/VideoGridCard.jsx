import React, { Component } from 'react';
import classNames from 'classnames';


class VideoGridCard extends Component {
  shouldComponentUpdate = (nextProps, nextState) => (
    this.props.stream !== nextProps.stream
  );

  videoSource = (stream) => {
    return window.URL ? window.URL.createObjectURL(stream)
                      : stream;
  };

  render() {
    return (
      <div className={ classNames('video-grid-card') }>
        <video
          className={ classNames('video-grid-card-video') }
          autoPlay={ true }
          src={ this.videoSource(this.props.stream) }>
        </video>
      </div>
    );
  }
}

export default VideoGridCard;
