import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Styles from './Styles.css';

const Progress = () => (
  <CircularProgress className={ Styles.progress } size={ 2 }/>
);

export default Progress;
