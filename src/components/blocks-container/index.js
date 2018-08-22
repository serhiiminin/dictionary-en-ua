import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const BlocksContainer = ({ classes, children }) => (
  <div className={classes.blocksContainer}>
    {children}
  </div>
);

BlocksContainer.propTypes = {
  classes: classesShape,
  children: PropTypes.node.isRequired,
};

BlocksContainer.defaultProps = {
  classes: classesDefaultProps
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(BlocksContainer);
