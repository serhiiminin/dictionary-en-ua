import React from 'react';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import * as yup from 'yup';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import styled from 'styled-components';
import {
  InputPassword,
  BlockSocial,
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
import routes from '../routes';
import { withAuth } from '../context/auth';
import { withErrors } from '../context/errors';
import { withLoading } from '../context/loading';

const SubmitBlock = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

const LinkForgotPassword = styled(Link)`
  font-style: normal;
  text-decoration: none;
  font-size: ${props => props.theme.main.fontSize.xs};
  font-family: ${props => props.theme.main.fontFamily.cairoRegular};
  letter-spacing: ${props => props.theme.main.letterSpacing.xs};
  color: ${props => props.theme.main.color.dark};
`;

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(VL.required)
    .email(VL.email),
  password: yup
    .string()
    .min(8, VL.passwordMinLength)
    .required(VL.required),
});

const fields = [
  { name: 'email', label: 'Email' },
  { name: 'password', label: 'Password', component: InputPassword },
];

const LoginForm = ({ handleBasicLogIn, handleGoogleLogIn, handleFacebookLogIn, checkIsLoading }) => {
  const isLoading = checkIsLoading(LN.auth.logIn);
  const handleGoogle = ({ accessToken }) => accessToken && handleGoogleLogIn(accessToken);
  const handleFacebook = ({ accessToken }) => accessToken && handleFacebookLogIn(accessToken);

  return (
    <>
      <TitleBlock>Welcome back, friend!</TitleBlock>
      <FormWrapper marginTop={3.5}>
        <Form
          validateOnBlur
          isLoading={isLoading}
          validateOnChange={false}
          onSubmit={handleBasicLogIn}
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={fields}
          renderSubmit={() => (
            <SubmitBlock>
              <ButtonSearch type="submit" color="secondary" variant="contained">
                Log in
              </ButtonSearch>
              <LinkForgotPassword to={routes.auth.forgotPassword}>Forgot your password?</LinkForgotPassword>
            </SubmitBlock>
          )}
        />
        <BlockSocial>
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
        </BlockSocial>
      </FormWrapper>
    </>
  );
};

export default compose(
  withRouter,
  withAuth,
  withErrors,
  withLoading
)(LoginForm);
