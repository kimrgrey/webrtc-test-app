import React, { Component } from 'react';
import classNames from 'classnames';


class LocalVideo extends Component {
  shouldComponentUpdate = (nextProps, nextState) => (
    this.props.stream !== nextProps.stream
  );

  videoSource = (stream) => {
    return window.URL ? window.URL.createObjectURL(stream)
                      : stream;
  };

  render() {
    return (
      <div className={ classNames('local-stream-card', 'overlay', 'bottom', 'left') }>
        <video
          className={ classNames('local-stream-card-video') }
          autoPlay
          muted
          src={ this.videoSource(this.props.stream) }>
        </video>
      </div>
    );
  }
}

export default LocalVideo;
