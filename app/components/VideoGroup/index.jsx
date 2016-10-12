import React, { Component } from 'react';
import lodash from 'lodash';
import Video from 'components/Video';
import Styles from './Styles.css';


class VideoGroup extends Component {
  render() {
    const { members, remoteStreams } = this.props;

    const videoFrames = lodash.map(Object.keys(members), (memberId) => {
      const stream = remoteStreams[memberId];

      if (stream) {
        const videoSource = window.URL ? window.URL.createObjectURL(stream)
                                       : stream;
        return (
          <Video
            key={ memberId }
            src={ videoSource }
            className={ Styles.video }
          />
        );
      }
      else {
        return (
          <div key={ memberId } className={ Styles.videoPlaceholder } />
        );
      }
    });

    return (
      <div className={ Styles.container }>
        { videoFrames }
      </div>
    );
  }
}

export default VideoGroup;
