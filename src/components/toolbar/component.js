import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = ({ classes, checkAllControl, children }) => (
  <div className={classes.toolbar}>
    <div>{checkAllControl}</div>
    <div className={classes.toolbarButtons}>{children}</div>
  </div>
);

Toolbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  checkAllControl: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Toolbar.defaultProps = {
  classes: {},
  checkAllControl: null,
};

export default Toolbar;
