import React from 'react';
import classNames from 'classnames';


const Container = ({ children }) => (
  <div className={ classNames('overlay', 'bottom', 'horizontal-center', 'conference-controls') }>
    <div className={ classNames('conference-controls-background') }></div>
    <div className={ classNames('overlay', 'fit', 'fullsize', 'conference-controls-foreground') }>
      { children }
    </div>
  </div>
);

export default Container;
