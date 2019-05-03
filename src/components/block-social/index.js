import React from 'react';
import PropTypes from 'prop-types';
import SC from './styles';

const BlockSocial = ({ children }) => (
  <SC.BlockSocial>
    <SC.Label>or continue with</SC.Label>
    {children}
  </SC.BlockSocial>
);

BlockSocial.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlockSocial;
