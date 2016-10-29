import React, { Component } from 'react';
import classNames from 'classnames';

import Container from './Container';
import CallTimer from './CallTimer';
import Button    from './Button';


class ConferenceControls extends Component {
  handleAudioToggle = (event) => {
    this.props.handleAudioToggle(!this.props.audioEnabled);
  };

  handleVideoToggle = (event) => {
    this.props.handleVideoToggle(!this.props.videoEnabled);
  }

  render() {
    const { hasAudio, hasVideo } = this.props;
    const { audioEnabled, videoEnabled } = this.props;
    const { handleAudioToggle, handleVideoToggle } = this.props;
    const { handleCallEnd } = this.props;

    const micIcon = hasAudio ? (audioEnabled ? 'mic' : 'mic_off') : 'mic_none';
    const camIcon = hasVideo ? (videoEnabled ? 'videocam' : 'videocam_off') : '';

    return (
      <Container>
        <CallTimer />
        <Button
          icon={ micIcon }
          disabled={ !hasAudio }
          checked={ hasAudio && !audioEnabled }
          handleClick={ this.handleAudioToggle }
          />
        <Button
          icon={ camIcon }
          disabled={ !hasVideo }
          checked={ hasVideo && !videoEnabled }
          handleClick={ this.handleVideoToggle }
          />
        <Button
          icon={ 'call_end' }
          checked
          handleClick={ handleCallEnd }
          />
      </Container>
    );
  }
}

export default ConferenceControls;
