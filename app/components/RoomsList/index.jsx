import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import AvVideoCall from 'material-ui/svg-icons/av/video-call';
import { List, ListItem } from 'material-ui/List';
import lodash from 'lodash';
import Styles from './Styles.css';


class RoomsList extends Component {
  render() {
    const { rooms } = this.props;

    const items = lodash.map(rooms, (r) => (
      <ListItem
        leftAvatar={
          <Avatar icon={ <AvVideoCall /> } />
        }
        primaryText={ r.name }
      />
    ));

    return (
      <List>
        { items }
      </List>
    );
  }
}

export default RoomsList;
