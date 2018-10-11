import React from 'react';
import PropTypes from 'prop-types';

const LineExplanation = ({ classes, label, children }) => (
  <div className={classes.lineExplanation}>
    {label && <div className={classes.label}>{`${label}:`}</div>}
    <div className={classes.text}>{children}</div>
  </div>
);

LineExplanation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  label: PropTypes.node,
  children: PropTypes.node,
};

LineExplanation.defaultProps = {
  label: null,
  children: null,
  classes: {},
};

export default LineExplanation;
