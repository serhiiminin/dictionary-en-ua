import React from 'react';
import SC from './styles';

interface Props {
  title: string;
  description: string;
  control?: JSX.Element;
}

const AuthSuggestion = ({ title, description, control }: Props): JSX.Element => (
  <SC.Wrapper>
    <SC.Inner>
      <SC.Title>{title}</SC.Title>
      <SC.Description>{description}</SC.Description>
      <SC.Control>{control}</SC.Control>
    </SC.Inner>
  </SC.Wrapper>
);

export default AuthSuggestion;
