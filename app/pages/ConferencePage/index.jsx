import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { values } from 'lodash';

import {
  joinRoom,
  leaveRoom,
  leaveRoomWithRedirect,
  sendMessage,
  toggleAudio,
  toggleVideo,
} from 'actions/conference';

import   Loader            from 'components/Loader';
import   ErrorBanner       from 'components/ErrorBanner';
import   ContentPlaceholder from 'components/ContentPlaceholder';
import   Chat              from 'components/Chat';
import   LocalVideo        from 'components/LocalVideo';
import   ConferenceControls from 'components/ConferenceControls';
import   Workspace         from 'components/Workspace';
import   SideBar           from 'components/SideBar';
import   Page              from 'components/Page';
import   VideoGrid         from 'components/VideoGrid';

import videoGridEmpty from '../../images/video-grid-empty.svg';


class ConferencePage extends Component {
  componentDidMount() {
    const { roomId } = this.props.params;
    this.props.joinRoom(roomId);
  }

  componentWillUnmount() {
    const { room } = this.props.conference;
    const { description } = room;

    description.id && this.props.leaveRoom();
  }

  sendMessage = (text) => {
    const { id } = this.props.application;
    this.props.sendMessage(id, text);
  };

  toggleAudio = (on) => {
    const { id } = this.props.application;
    this.props.toggleAudio(id, on);
  };

  toggleVideo = (on) => {
    const { id } = this.props.application;
    this.props.toggleVideo(id, on);
  };

  render() {
    const { messages, room, remoteStreams, localStream } = this.props.conference;
    const { error, loading } = room;

    const members = values(this.props.conference.members);

    return (
      <Page>
        { error &&
          <ErrorBanner text={ 'Room Connection Error' } />
        }

        { loading &&
          <Loader />
        }

        { !error && !loading &&
          <Workspace>
            { members.length === 0 &&
              <ContentPlaceholder
                icon={ videoGridEmpty }
                text={ 'No Members' }
                dark
              />
            }

            { members.length > 0 &&
              <VideoGrid members={ members } streamDescriptions={ remoteStreams } />
            }

            { localStream && localStream.hasVideo &&
              <LocalVideo streamDescription={ localStream } />
            }

            <ConferenceControls
              { ...localStream }
              handleAudioToggle={ this.toggleAudio }
              handleVideoToggle={ this.toggleVideo }
              handleCallEnd={ this.props.leaveRoomWithRedirect }
            />
          </Workspace>
        }

        { !error && !loading &&
          <SideBar type={ 'right' } open>
            <Chat
              members={ members }
              messages={ messages }
              room={ room }
              handleMessageSubmit={ this.sendMessage }
            />
          </SideBar>
        }
      </Page>
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
    toggleAudio,
    toggleVideo,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
