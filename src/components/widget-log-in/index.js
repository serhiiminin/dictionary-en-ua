import React from 'react';
import SC from './styles';
import routes from '../../routes';

const WidgetLogIn = () => (
  <SC.Wrapper>
    <SC.Inner>
      <SC.Title>Have an account?</SC.Title>
      <SC.Description>Welcome back, Friend!</SC.Description>
      <SC.Button to={routes.auth.logIn}>Log in</SC.Button>
    </SC.Inner>
  </SC.Wrapper>
);

export default WidgetLogIn;
