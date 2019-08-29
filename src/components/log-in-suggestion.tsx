import React from 'react';
import { AuthSuggestion, ButtonPrimary } from './index';
import routes from '../routes';

const LogInSuggestion = (): JSX.Element => (
  <AuthSuggestion
    title="Have an account?"
    description="Welcome back, friend!"
    control={<ButtonPrimary to={routes.auth.logIn}>Log in</ButtonPrimary>}
  />
);

export default LogInSuggestion;
