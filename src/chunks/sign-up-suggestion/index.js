import React from 'react';
import { AuthSuggestion, ButtonPrimary } from '../../components';
import routes from '../../routes';

const SignUpSuggestion = () => (
  <AuthSuggestion
    title="First here?"
    description="Create an account now!"
    control={<ButtonPrimary to={routes.auth.signUp}>Sign up</ButtonPrimary>}
  />
);

export default SignUpSuggestion;
