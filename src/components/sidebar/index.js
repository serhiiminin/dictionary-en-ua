import React from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import styles from './styles';

const Sidebar = ({ children, classes }) => (
  <div className={classes.sidebar}>
    {children}
  </div>
);

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Sidebar);
