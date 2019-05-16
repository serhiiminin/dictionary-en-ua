import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  InputPassword,
  BlockSocial,
  ButtonSearch,
  ButtonFacebook,
  ButtonGoogle,
  Form,
  FormWrapper,
} from '../../components';
import LN from '../../constants/loading-names';
import config from '../../config';
import SC from './styles';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
  password: yup.string().required('Required'),
});

class LoginForm extends Component {
  static propTypes = {
    handleBasicLogIn: PropTypes.func.isRequired,
    handleGoogleLogIn: PropTypes.func.isRequired,
    handleFacebookLogIn: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
  };

  handleSubmit = formData => {
    const { handleBasicLogIn } = this.props;

    handleBasicLogIn(formData);
  };

  handleGoogle = tokenData => {
    const { accessToken } = tokenData;
    const { handleGoogleLogIn } = this.props;

    return handleGoogleLogIn(accessToken);
  };

  handleFacebook = tokenData => {
    const { accessToken } = tokenData;
    const { handleFacebookLogIn } = this.props;

    return handleFacebookLogIn(accessToken);
  };

  render() {
    const { checkIsLoading } = this.props;
    const isLoading = checkIsLoading(LN.auth.logIn);

    return (
      <div>
        <SC.Title>Welcome back, friend!</SC.Title>
        <FormWrapper>
          <Form
            validateOnBlur
            isLoading={isLoading}
            validateOnChange={false}
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            fields={[
              {
                name: 'email',
                label: 'Email',
              },
              {
                name: 'password',
                label: 'Password',
                component: InputPassword,
              },
            ]}
            renderSubmit={() => (
              <div>
                <ButtonSearch type="submit" color="secondary" variant="contained">
                  Log in
                </ButtonSearch>
              </div>
            )}
          />
        </FormWrapper>
        <BlockSocial>
          <FacebookLogin
            appId={config.auth.facebook.appId}
            callback={this.handleFacebook}
            render={({ onClick }) => <ButtonFacebook onClick={onClick} />}
          />
          <GoogleLogin
            clientId={config.auth.google.clientId}
            onSuccess={this.handleGoogle}
            render={({ onClick }) => <ButtonGoogle onClick={onClick} />}
          />
        </BlockSocial>
      </div>
    );
  }
}

export default LoginForm;
