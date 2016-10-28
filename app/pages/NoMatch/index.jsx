import React, { Component } from 'react';
import classNames from 'classnames';

import Page from 'components/Page';


class NoMatch extends Component {
  render() {
    return (
      <Page>
        <div className={ classNames('nomatch') }>
          <h1>Such Error...</h1>
          <h2>So Not Found...</h2>
          <h3>Wow...</h3>
        </div>
      </Page>
    );
  }
}

export default NoMatch;
