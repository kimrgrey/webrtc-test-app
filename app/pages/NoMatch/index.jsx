import React, { Component } from 'react';
import Banner from 'components/Banner';
import Styles from './Styles.css';


class NoMatch extends Component {
  render() {
    return (
      <div className={ Styles.container }>
        <Banner text={ 'SUCH ERROR, SO NOT FOUND' } />
      </div>
    );
  }
}

export default NoMatch;
