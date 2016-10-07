import React, { Component } from 'react';
import Styles from './Styles.css';


class Banner extends Component {
  render() {
    return (
      <div className={ Styles.banner }>
        { this.props.text }
      </div>
    );
  }
}

export default Banner;
