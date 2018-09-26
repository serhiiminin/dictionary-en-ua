import PropTypes from 'prop-types';
import React from 'react';

const BlocksContainer = ({ classes, children }) => (
  <div className={classes.blocksContainer}>
    {children}
  </div>
);

BlocksContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

BlocksContainer.defaultProps = {
  classes: {}
};

export default BlocksContainer;
