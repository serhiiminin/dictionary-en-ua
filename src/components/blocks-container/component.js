import PropTypes from 'prop-types';
import React from 'react';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';

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

export default BlocksContainer;
