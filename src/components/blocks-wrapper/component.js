import React from 'react';
import PropTypes from 'prop-types';

const BlocksWrapper = ({ children }) => <div>{children}</div>;

BlocksWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlocksWrapper;
