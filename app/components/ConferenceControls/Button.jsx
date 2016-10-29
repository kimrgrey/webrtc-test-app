import React, { Component } from 'react';
import classNames from 'classnames';


class Button extends Component {
  render() {
    const { icon, checked, disabled, handleClick } = this.props;

    return (
      <div
        className={ classNames('conference-controls-item', 'button', { checked }) }
        disabled={ disabled }
        >
        <div
          className={ classNames('conference-controls-item', 'button', 'highlight') }
          onClick={ handleClick }
          >
        </div>
        <div
          className={ classNames('conference-controls-item', 'button', 'icon', 'material-icons', 'md-18', 'md-light', disabled && 'md-inactive') }
          >
          { icon }
        </div>
        { disabled &&
          <div className={ classNames('conference-controls-item', 'button', 'disabler') }>
          </div>
        }
      </div>
    );
  }
}

export default Button;
