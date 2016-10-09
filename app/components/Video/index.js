import React, { Component } from 'react';


class Video extends Component {
  render() {
    const { className, src, ...other } = this.props;
    return (
      <video
          autoPlay
          className={ this.props.className }
          src={ this.props.src }
          { ...other }
      >
    </video>
    );
  }
}

export default Video;
