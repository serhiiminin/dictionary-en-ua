import React from 'react';
import * as yup from 'yup';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  InputPassword,
  ButtonSearch,
  ButtonFacebook,
  ButtonGoogle,
  Form,
  FormWrapper,
  TitleBlock,
} from '../components';
import LN from '../constants/loading-names';
import VL from '../constants/validation-lines';
import config from '../config';
import { withAuth } from '../context/auth';
import { withLoading } from '../context/loading';
import { withErrors } from '../context/errors';

const SubmitWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(VL.required)
    .email(VL.email),
  password: yup
    .string()
    .required(VL.required)
    .min(8, VL.passwordMinLength)
    .oneOf([yup.ref('passwordConfirm'), null], VL.match),
  passwordConfirm: yup
    .string()
    .required(VL.required)
    .min(8, VL.passwordMinLength)
    .oneOf([yup.ref('password'), null], VL.match),
});

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'password', label: 'Password', component: InputPassword },
  { name: 'passwordConfirm', label: 'Repeat password', component: InputPassword },
];

const SignUpForm = ({ handleBasicSignUp, handleGoogleSignUp, handleFacebookSignUp, checkIsLoading }) => {
  const isLoading = checkIsLoading(LN.auth.signUp);
  const handleGoogle = ({ accessToken }) => accessToken && handleGoogleSignUp(accessToken);
  const handleFacebook = ({ accessToken }) => accessToken && handleFacebookSignUp(accessToken);

  return (
    <>
      <TitleBlock>First here? Create an account now!</TitleBlock>
      <FormWrapper marginTop={3.5}>
        <Form
          isLoading={isLoading}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleBasicSignUp}
          fields={fields}
          renderSubmit={() => (
            <SubmitWrapper>
              <ButtonSearch type="submit" color="secondary" variant="contained">
                Sign up
              </ButtonSearch>
              <FacebookLogin
                appId={config.auth.facebook.appId}
                callback={handleFacebook}
                render={({ onClick }) => <ButtonFacebook onClick={onClick} />}
              />
              <GoogleLogin
                clientId={config.auth.google.clientId}
                onSuccess={handleGoogle}
                render={({ onClick }) => <ButtonGoogle onClick={onClick} />}
              />
            </SubmitWrapper>
          )}
        />
      </FormWrapper>
    </>
  );
};

export default compose(
  withRouter,
  withAuth,
  withLoading,
  withErrors
)(SignUpForm);
