import React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
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
} from './index';
import LN from '../constants/loading-names';
import VL from '../constants/validation-lines';
import config from '../config';
import routes from '../routes';
import { withAuth, AI } from '../context/auth';
import { withLoading, LI } from '../context/loading';
import { ThemeProps } from '../types';
import { withErrors, EI } from '../context/errors';

const SubmitBlock = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

const LinkForgotPassword = styled(Link)`
  font-style: normal;
  text-decoration: none;
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.xs};
  font-family: ${(props: ThemeProps): string => props.theme.main.fontFamily.cairoRegular};
  letter-spacing: ${(props: ThemeProps): string => props.theme.main.letterSpacing.xs};
  color: ${(props: ThemeProps): string => props.theme.main.color.dark};
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

const fields = [{ name: 'email', label: 'Email' }, { name: 'password', label: 'Password', component: InputPassword }];

type Props = AI & LI & EI;
interface RenderProps {
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const LoginForm = (props: Props): JSX.Element => {
  const { handleBasicLogIn, handleGoogleLogIn, handleFacebookLogIn, checkIsLoading, handleError } = props;
  const isLoading = checkIsLoading(LN.auth.logIn);

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
          renderSubmit={(): JSX.Element => (
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
            callback={handleFacebookLogIn}
            render={({ onClick }: RenderProps): JSX.Element => <ButtonFacebook onClick={onClick} />}
          />
          <GoogleLogin
            clientId={config.auth.google.clientId}
            onSuccess={handleGoogleLogIn}
            onFailure={handleError}
            render={(renderProps): JSX.Element => <ButtonGoogle onClick={renderProps && renderProps.onClick} />}
          />
        </BlockSocial>
      </FormWrapper>
    </>
  );
};

export default compose<Props, {}>(
  withAuth,
  withErrors,
  withLoading
)(LoginForm);
