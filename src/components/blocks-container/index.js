import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const BlocksContainer = ({ classes, children }) => (
  <div className={classes.blocksContainer}>
    {children}
  </div>
);

BlocksContainer.propTypes = {
  classes: classesShape.isRequired,
  children: PropTypes.node.isRequired,
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(BlocksContainer);
