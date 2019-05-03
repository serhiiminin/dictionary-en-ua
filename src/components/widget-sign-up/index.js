import React from 'react';
import routes from '../../routes';
import SC from './styles';

const WidgetSignUp = () => (
  <SC.Wrapper>
    <SC.Inner>
      <SC.Title>First here?</SC.Title>
      <SC.Description>Create an account now!</SC.Description>
      <SC.Button to={routes.auth.signUp}>Sign up</SC.Button>
    </SC.Inner>
  </SC.Wrapper>
);

export default WidgetSignUp;
