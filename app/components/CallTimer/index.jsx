import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';

require("moment-duration-format");


class CallTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 0,
    };
  }

  tick() {
    this.setState((prevState) => ({
      duration: prevState.duration + 1
    }));
  };

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  render() {
    const { duration } = this.state;
    const durationText = moment.duration(duration, 'seconds').format('mm:ss', { trim: false });

    return (
      <div className={ classNames('overlay', 'bottom', 'horizontal-center', 'call-timer') }>
        <div className={ classNames('call-timer-background') }></div>
        <div className={ classNames('overlay', 'fit', 'fullsize', 'call-timer-foreground') }>
          { durationText }
        </div>
      </div>
    );
  }
}

export default CallTimer;
