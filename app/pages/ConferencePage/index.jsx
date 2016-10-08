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
  fetchRoom,
  joinRoom,
  leaveRoom,
  leaveRoomWithRedirect,
  getLocalStream,
  closeLocalStream,
} from 'actions/conference';

import Styles from './Styles.css';


class ConferencePage extends Component {
  componentDidMount() {
    const { roomId } = this.props.params;
    this.props.fetchRoom(roomId);
    this.props.getLocalStream();
  }

  componentWillUnmount() {
    const { room, localStream } = this.props;

    if (room.id !== undefined) {
      this.props.leaveRoom();
    }

    if (localStream.stream !== undefined) {
      this.props.closeLocalStream(localStream.stream);
    }
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
    var videoSource = "";
    if (localStream.stream) {
      videoSource = window.URL ? window.URL.createObjectURL(localStream.stream)
                               : localStream.stream;
    }

    return <Video className={ Styles.localVideo } src={ videoSource } />;
  }

  pageContent() {
    const { loading, room, remoteStreams } = this.props;

    if (loading) {
      return <Progress />;
    }
    else {
      if (room.id !== undefined) {
        return <VideoGroup videoSources={ remoteStreams } />
      }
      else {
        return <Banner text={ 'ROOM NOT FOUND' } />;
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
    fetchRoom,
    joinRoom,
    leaveRoom,
    leaveRoomWithRedirect,
    getLocalStream,
    closeLocalStream,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
