import React from 'react';
import { AuthSuggestion, ButtonPrimary } from '.';
import routes from '../routes';

const SignUpSuggestion = (): JSX.Element => (
  <AuthSuggestion
    title="First here?"
    description="Create an account now!"
    control={<ButtonPrimary to={routes.auth.signUp}>Sign up</ButtonPrimary>}
  />
);

export default SignUpSuggestion;
