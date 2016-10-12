import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import CommunicationCallEnd from 'material-ui/svg-icons/communication/call-end';
import { red500 } from 'material-ui/styles/colors';

import Banner from 'components/Banner';
import Progress from 'components/Progress';
import Video from 'components/Video';
import VideoGroup from 'components/VideoGroup';

import {
  joinRoom,
  leaveRoom,
  leaveRoomWithRedirect,
} from 'actions/conference';

import Styles from './Styles.css';


class ConferencePage extends Component {
  componentDidMount() {
    const { roomId } = this.props.params;
    this.props.joinRoom(roomId);
  }

  componentWillUnmount() {
    const { room, localStream } = this.props;

    room && this.props.leaveRoom(room.id, localStream);
  }

  leaveRoomButton() {
    const { room } = this.props;

    return (
      <FloatingActionButton
        backgroundColor={ red500 }
        className={ Styles.action_button }
        onTouchTap={ this.props.leaveRoomWithRedirect }
      >
        <CommunicationCallEnd />
      </FloatingActionButton>
    );
  }

  localVideo() {
    const { localStream } = this.props;

    if (localStream) {
      const videoSource = window.URL ? window.URL.createObjectURL(localStream)
                                     : localStream;
      return (
       <Video
         className={ Styles.localVideo }
         src={ videoSource }
         muted
       />
      );
    }

    return (
      <div className={ Styles.localVideoPlaceholder } />
    );
  }

  pageContent() {
    const { connecting, room, members, remoteStreams } = this.props;

    if (connecting) {
      return <Progress />;
    }
    else {
      if (room) {
        return <VideoGroup members={ members } remoteStreams={ remoteStreams } />
      }
      else {
        return <Banner text={ 'ROOM CONNECTION ERROR' } />;
      }
    }
  }

  render() {
    return (
      <div className={ Styles.container }>
        { this.pageContent() }
        { this.localVideo() }
        { this.leaveRoomButton() }
      </div>
    );
  }
}

const mapStateToProps = (state) => state.conference;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    joinRoom,
    leaveRoom,
    leaveRoomWithRedirect,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
