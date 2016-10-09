import React, { Component } from 'react';
import lodash from 'lodash';
import Video from 'components/Video';
import Styles from './Styles.css';


class VideoGroup extends Component {
  render() {
    const { videoSources } = this.props;

    const videoFrames = lodash.map(videoSources, ({ id, stream }) => {
      const videoSource = window.URL ? window.URL.createObjectURL(stream)
                                     : stream;
      return (
        <Video
          key={ id }
          src={ videoSource }
          className={ Styles.video }
        />
      );
    });

    return (
      <div className={ Styles.container }>
        { videoFrames }
      </div>
    );
  }
}

export default VideoGroup;
