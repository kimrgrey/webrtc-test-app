import React, { Component } from 'react';
import lodash from 'lodash';
import Video from 'components/Video';
import Styles from './Styles.css';


class VideoGroup extends Component {
  render() {
    const { videoSources } = this.props;

    const videoFrames = lodash.map(videoSources, (src) => (
      // FIXME: use Id from remote stream
      <Video key={ lodash.uniqueId() } src={ src } className={ Styles.video } />
    ));

    return (
      <div className={ Styles.container }>
        { videoFrames }
      </div>
    );
  }
}

export default VideoGroup;
