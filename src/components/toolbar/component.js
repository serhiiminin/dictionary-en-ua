import React from 'react';
import PropTypes from 'prop-types';

const ToolbarCmp = ({ classes, checkAllControl, children }) => (
  <div className={classes.toolbar}>
    <div>{checkAllControl}</div>
    <div className={classes.toolbarButtons}>{children}</div>
  </div>
);

ToolbarCmp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  checkAllControl: PropTypes.node,
  children: PropTypes.node.isRequired,
};

ToolbarCmp.defaultProps = {
  classes: {},
  checkAllControl: null,
};

export default ToolbarCmp;
