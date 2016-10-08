import React, { Component } from 'react';


class Video extends Component {
  render() {
    return (
      <video
          autoPlay
          className={ this.props.className }
          src={ this.props.src }
      >
    </video>
    );
  }
}

export default Video;
