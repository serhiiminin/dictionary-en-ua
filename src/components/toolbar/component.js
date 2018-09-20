import React from 'react';
import PropTypes from 'prop-types';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';

const ToolbarCmp = ({ classes, checkAllControl, children }) => (
  <div className={classes.toolbar}>
    <div>{checkAllControl}</div>
    <div className={classes.toolbarButtons}>{children}</div>
  </div>
);

ToolbarCmp.propTypes = {
  classes: classesShape,
  checkAllControl: PropTypes.node,
  children: PropTypes.node.isRequired,
};

ToolbarCmp.defaultProps = {
  classes: classesDefaultProps,
  checkAllControl: null,
};

export default ToolbarCmp;
