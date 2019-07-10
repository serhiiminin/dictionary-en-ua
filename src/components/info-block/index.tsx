import React from 'react';
import SC from './styles';

interface Props {
  title: string;
  description: string;
  children: JSX.Element;
}

const InfoBlock = ({ title, description, children }: Props): JSX.Element => (
  <SC.Outer>
    {title && <SC.Title>{title}</SC.Title>}
    {description && <SC.Description>{description}</SC.Description>}
    {children && <SC.Info>{children}</SC.Info>}
  </SC.Outer>
);

export default InfoBlock;
