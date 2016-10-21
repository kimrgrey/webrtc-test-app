import React, { Component } from 'react';
import classNames from 'classnames';


class NoMatch extends Component {
  render() {
    return (
      <div className={ classNames('nomatch-container') }>
        <h1>Such Error...</h1>
        <h2>So Not Found...</h2>
        <h3>Wow...</h3>
      </div>
    );
  }
}

export default NoMatch;
