import React from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { styles } from './styles';

const BlocksContainerCmp = ({ classes, children }) => (
  <div className={classes.root}>
    {children}
  </div>
);

const BlocksContainer = compose(
  injectSheet(styles)
)(BlocksContainerCmp);

export { BlocksContainer }
