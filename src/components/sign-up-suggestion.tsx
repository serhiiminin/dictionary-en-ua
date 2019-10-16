import React from 'react';
import AuthSuggestion from './auth-suggestion';
import ButtonPrimary from './button-primary';
import routes from '../routes';

const SignUpSuggestion = (): JSX.Element => (
  <AuthSuggestion
    title="First here?"
    description="Create an account now!"
    control={<ButtonPrimary to={routes.auth.signUp}>Sign up</ButtonPrimary>}
  />
);

export default SignUpSuggestion;
