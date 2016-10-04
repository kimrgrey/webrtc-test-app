import React from 'react';
import Styles from './Styles.css';

const Page = ({ children }) => (
  <div className={ Styles.page }>
    { children }
  </div>
);

export default Page;
