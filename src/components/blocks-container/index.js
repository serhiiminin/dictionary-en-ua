import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import styles from './styles';

const BlocksContainer = ({ classes, children }) => (
  <div className={classes.root}>
    {children}
  </div>
);

BlocksContainer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(BlocksContainer);
