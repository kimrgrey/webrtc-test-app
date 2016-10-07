import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Link } from 'react-router';
import lodash from 'lodash';
import Styles from './Styles.css';


class RoomsGrid extends Component {
  render() {
    const { rooms } = this.props;

    const tiles = lodash.map(rooms, (r) => (
      <GridTile
        key={ r.id }
        title={ <Link to={ '/conference/' + r.id }>{ r.name }</Link> }
        titlePosition={ 'bottom' }
      >
        <div className={ Styles.avatar } />
      </GridTile>
    ));

    return (
      <div className={ Styles.root }>
        <GridList
          cols={ 4 }
          cellHeight={ 300 }
          className={ Styles.grid }
        >
          { tiles }
        </GridList>
      </div>
    );
  }
}

export default RoomsGrid;
