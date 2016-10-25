import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { values } from 'lodash';

import {
  joinRoom,
  leaveRoom,
  leaveRoomWithRedirect,
  sendMessage,
} from 'actions/conference';

import { Content }         from 'components/Page';
import   Loader            from 'components/Loader';
import   ErrorBanner       from 'components/ErrorBanner';
import   Chat              from 'components/Chat';
import   VideoGrid         from 'components/VideoGrid';
import { LeaveRoomButton } from 'components/ActionButton';


class ConferencePage extends Component {
  componentDidMount() {
    const { roomId } = this.props.params;
    this.props.joinRoom(roomId);
  }

  componentWillUnmount() {
    const { room, streams } = this.props.conference;
    const { description } = room;
    const { localStream } = streams;

    description.id && this.props.leaveRoom(description.id, localStream);
  }

  sendMessage = (text) => {
    const { id } = this.props.application;
    this.props.sendMessage(id, text);
  };

  render() {
    const { messages, room, streams } = this.props.conference;
    const { error, loading } = room;

    const remoteStreams = values(streams.remoteStreams);

    return (
      <Content>
        { error &&
          <ErrorBanner enabled text={ 'Room Connection Error' } />
        }
        { loading &&
          <Loader enabled />
        }
        <Chat messages={ messages } handleMessageSubmit={ this.sendMessage } />
        <VideoGrid streams={ remoteStreams } />
        <LeaveRoomButton handleClick={ this.props.leaveRoomWithRedirect } />
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  const { application, conference } = state;
  return { application, conference };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    joinRoom,
    leaveRoom,
    leaveRoomWithRedirect,
    sendMessage,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
