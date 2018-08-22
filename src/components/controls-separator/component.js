import PropTypes from 'prop-types';
import React from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';

const ControlsSeparator = ({ children, classes, align }) => (
  <div className={`${classes.alignControls} ${classes[align]}`}>
    {children}
  </div>
);

ControlsSeparator.propTypes = {
  classes: classesShape,
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
};

ControlsSeparator.defaultProps = {
  align: 'left',
  classes: classesDefaultProps,
};

export default ControlsSeparator;
