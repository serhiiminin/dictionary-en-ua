import PropTypes from 'prop-types';
import React from 'react';

const BlocksWrapper = ({ classes, children }) => (
  <div className={classes.blocksContainer}>
    {children}
  </div>
);

BlocksWrapper.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

BlocksWrapper.defaultProps = {
  classes: {}
};

export default BlocksWrapper;
