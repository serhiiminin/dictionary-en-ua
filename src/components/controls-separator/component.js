import React from 'react';
import PropTypes from 'prop-types';

const ControlsSeparator = ({ children, classes, align }) => (
  <div className={`${classes.alignControls} ${classes[align]}`}>
    {children}
  </div>
);

ControlsSeparator.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
};

ControlsSeparator.defaultProps = {
  align: 'left',
  classes: {},
};

export default ControlsSeparator;
