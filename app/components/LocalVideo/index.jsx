import React, { Component } from 'react';
import classNames from 'classnames';


class LocalVideo extends Component {
  shouldComponentUpdate = (nextProps, nextState) => (
    this.props.streamDescription.previewStream !==
    nextProps.streamDescription.previewStream
  );

  videoSource = (stream) => {
    return window.URL ? window.URL.createObjectURL(stream)
                      : stream;
  };

  render() {
    const { previewStream } = this.props.streamDescription;

    return (
      <div className={ classNames('local-stream-card', 'overlay', 'bottom', 'left') }>
        { previewStream &&
          <video
            className={ classNames('local-stream-card-video') }
            autoPlay
            muted
            src={ this.videoSource(previewStream) }>
          </video>
        }
      </div>
    );
  }
}

export default LocalVideo;
