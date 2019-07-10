import React from 'react';
import SC from './styles';

interface Props {
  children(props: object): JSX.Element;
}

const BlocksWrapper = ({ children }: Props): JSX.Element => <SC.BlockWrapper>{children}</SC.BlockWrapper>;

export default BlocksWrapper;
