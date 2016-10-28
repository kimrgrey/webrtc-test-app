import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import classNames from 'classnames';


class RoomGridCard extends Component {
  handleClick = () => {
    const { id } = this.props;
    browserHistory.push('/conference/' + id);
  };

  render() {
    const { id, name } = this.props;

    return (
      <div className={ classNames('grid-item', 'room-grid-card') }>
        <div className={ classNames('overlay', 'fit') }>
          <p className={ classNames('overlay', 'fit', 'material-icons', 'md-128', 'md-dark', 'md-inactive') }>
            people
          </p>
        </div>
        <div className={ classNames('room-grid-card-caption', 'background') }></div>
        <div className={ classNames('room-grid-card-caption', 'foreground') }>
          <p>{ name }</p>
        </div>
        <div
          className={ classNames('overlay','fit', 'fullsize', 'room-grid-card-overlay') }
          onClick={ this.handleClick }
          >
        </div>
      </div>
    );
  }
}

export default RoomGridCard;
