import React from 'react';
import Styles from './Styles.css';

const RoomsListEmptyBanner = () => (
  <div className={ Styles.banner }>
    { 'NO CONFERENCE ROOMS' }
  </div>
);

export default RoomsListEmptyBanner;
