import PropTypes from 'prop-types';
import React from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';

const LineExplanation = ({ classes, label, children }) => (
  <div className={classes.lineExplanation}>
    <div className={classes.label}>{`${label}:`}</div>
    <div className={classes.text}>{children}</div>
  </div>
);

LineExplanation.propTypes = {
  classes: classesShape,
  label: PropTypes.node.isRequired,
  children: PropTypes.node,
};

LineExplanation.defaultProps = {
  children: null,
  classes: classesDefaultProps,
};

export default LineExplanation;
