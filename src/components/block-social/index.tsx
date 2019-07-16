import React from 'react';
import SC from './styles';

interface Props {
  children: JSX.Element;
}

const BlockSocial = ({ children }: Props): JSX.Element => (
  <SC.BlockSocial>
    <SC.Label>or continue with</SC.Label>
    {children}
  </SC.BlockSocial>
);

export default BlockSocial;
