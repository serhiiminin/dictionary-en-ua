import React from 'react';
import PropTypes from 'prop-types';

const LineExplanation = ({ classes, label, children }) => (
  <div className={classes.lineExplanation}>
    <div className={classes.label}>{`${label}:`}</div>
    <div className={classes.text}>{children}</div>
  </div>
);

LineExplanation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  label: PropTypes.node.isRequired,
  children: PropTypes.node,
};

LineExplanation.defaultProps = {
  children: null,
  classes: {},
};

export default LineExplanation;
