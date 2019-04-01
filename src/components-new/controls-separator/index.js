import React from 'react';
import PropTypes from 'prop-types';
import SC from './styles';

const ControlsSeparator = props => <SC.ControlsSeparator {...props} />;

ControlsSeparator.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
};

ControlsSeparator.defaultProps = {
  align: 'left',
};

export default ControlsSeparator;
