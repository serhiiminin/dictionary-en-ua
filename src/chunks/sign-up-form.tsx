import React from 'react';
import * as yup from 'yup';
import { compose } from 'recompose';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';
// @ts-ignore
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
import { withAuth, AI } from '../context/auth';
import { withErrors, EI } from '../context/errors';
import { withLoading, LI } from '../context/loading';

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
    .oneOf([yup.ref('passwordConfirm'), ''], VL.match),
  passwordConfirm: yup
    .string()
    .required(VL.required)
    .min(8, VL.passwordMinLength)
    .oneOf([yup.ref('password'), ''], VL.match),
});

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'password', label: 'Password', component: InputPassword },
  { name: 'passwordConfirm', label: 'Repeat password', component: InputPassword },
];

type Props = AI & EI & LI;
interface RenderProps {
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const SignUpForm = (props: Props): JSX.Element => {
  const { handleBasicSignUp, handleGoogleSignUp, handleFacebookSignUp, checkIsLoading, handleError } = props;
  const isLoading = checkIsLoading(LN.auth.signUp);

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
          renderSubmit={(): JSX.Element => (
            <SubmitWrapper>
              <ButtonSearch type="submit" color="secondary" variant="contained">
                Sign up
              </ButtonSearch>
              <FacebookLogin
                appId={config.auth.facebook.appId}
                callback={handleFacebookSignUp}
                render={({ onClick }: RenderProps): JSX.Element => <ButtonFacebook onClick={onClick} />}
              />
              <GoogleLogin
                clientId={config.auth.google.clientId}
                onSuccess={handleGoogleSignUp}
                onFailure={handleError}
                render={(renderProps): JSX.Element => <ButtonGoogle onClick={renderProps && renderProps.onClick} />}
              />
            </SubmitWrapper>
          )}
        />
      </FormWrapper>
    </>
  );
};

export default compose<Props, {}>(
  withAuth,
  withErrors,
  withLoading
)(SignUpForm);
