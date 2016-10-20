import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';


const RoomGridCard = ({ id, name }) => (
  <div className={ classNames('room-grid-card') }>
    <div className={ classNames('room-grid-card-caption', 'background') }></div>
    <div className={ classNames('room-grid-card-caption', 'foreground') }>
      <Link
        className={ classNames('room-grid-card-caption-link') }
        to={ '/conference/' + id }
      >
        { name }
      </Link>
    </div>
  </div>
);

export default RoomGridCard;
