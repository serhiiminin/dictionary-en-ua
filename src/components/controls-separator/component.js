import React from 'react';
import PropTypes from 'prop-types';

const ControlsSeparator = ({ children, align }) => <div align={align}>{children}</div>;

ControlsSeparator.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
};

ControlsSeparator.defaultProps = {
  align: 'left',
};

export default ControlsSeparator;
