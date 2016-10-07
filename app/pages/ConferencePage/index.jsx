import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Banner from 'components/Banner';
import Progress from 'components/Progress';

import { fetchRoom, joinRoom, leaveRoom } from 'actions/conference';

import Styles from './Styles.css';


class ConferencePage extends Component {
  componentDidMount() {
    const { roomId } = this.props.params;
    this.props.fetchRoom(roomId);
  }

  componentWillUnmount() {
    const { room } = this.props;

    if (room.id !== undefined) {
      this.props.leaveRoom();
    }
  }

  pageContent() {
    const { loading, room } = this.props;

    if (loading) {
      return <Progress />;
    }
    else {
      if (room.id !== undefined) {
        return <Banner text={ 'ROOM FOUND' } />;
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
