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

import   Loader            from 'components/Loader';
import   ErrorBanner       from 'components/ErrorBanner';
import   ContentPlaceholder from 'components/ContentPlaceholder';
import   Chat              from 'components/Chat';
import   LocalVideo        from 'components/LocalVideo';
import   Workspace         from 'components/Workspace';
import   SideBar           from 'components/SideBar';
import   Page              from 'components/Page';
import   VideoGrid         from 'components/VideoGrid';
import { LeaveRoomButton } from 'components/ActionButton';

import videoGridEmpty from '../../images/video-grid-empty.svg';


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

    const members = values(this.props.conference.members);
    const localStream = streams.localStream;
    const remoteStreams = values(streams.remoteStreams);

    return (
      <Page>
        { error &&
          <ErrorBanner text={ 'Room Connection Error' } />
        }

        { loading &&
          <Loader />
        }

        { !error &&
          <Workspace>
            { members.length === 0 &&
              <ContentPlaceholder icon={ videoGridEmpty } text={ 'No Members' } />
            }

            { members.length > 0 &&
              <VideoGrid streams={ remoteStreams } />
            }

            { localStream !== null &&
              <LocalVideo stream={ localStream } />
            }

            <LeaveRoomButton handleClick={ this.props.leaveRoomWithRedirect } />
          </Workspace>
        }

        { !error &&
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
