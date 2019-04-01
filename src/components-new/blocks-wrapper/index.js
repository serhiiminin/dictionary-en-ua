import React from 'react';
import PropTypes from 'prop-types';
import SC from './styles';

const BlocksWrapper = ({ children }) => <SC.BlockWrapper>{children}</SC.BlockWrapper>;

BlocksWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlocksWrapper;
