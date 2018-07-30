import React from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import styles from './styles';

const BlocksContainer = ({ classes, children }) => (
  <div className={classes.root}>
    {children}
  </div>
);

const enhance = compose(
  injectSheet(styles)
);

export default enhance(BlocksContainer);
