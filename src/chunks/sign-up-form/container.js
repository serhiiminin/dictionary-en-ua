import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  InputPassword,
  BlockSocial,
  ButtonSearch,
  ButtonFacebook,
  ButtonGoogle,
  Form,
  FormField,
} from '../../components';
import config from '../../config';
import SC from './styles';

class SignUpForm extends Component {
  static propTypes = {
    handleBasicSignUp: PropTypes.func.isRequired,
    handleGoogleSignUp: PropTypes.func.isRequired,
    handleFacebookSignUp: PropTypes.func.isRequired,
  };

  handleSubmit = formData => {
    const { handleBasicSignUp } = this.props;

    handleBasicSignUp(formData);
  };

  handleGoogle = tokenData => {
    const { accessToken } = tokenData;
    const { handleGoogleSignUp } = this.props;

    return handleGoogleSignUp(accessToken);
  };

  handleFacebook = tokenData => {
    const { accessToken } = tokenData;
    const { handleFacebookSignUp } = this.props;

    return handleFacebookSignUp(accessToken);
  };

  render() {
    const initialValues = {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    };

    return (
      <div>
        <SC.Title>First here? Create an account now!</SC.Title>
        <Form initialValues={initialValues} onSubmit={this.handleSubmit}>
          <FormField name="name" variant="outlined" label="Name" />
          <FormField name="email" variant="outlined" label="Email" />
          <FormField name="password" label="Password" variant="outlined" component={InputPassword} />
          <FormField name="repeatPassword" label="Repeat password" variant="outlined" component={InputPassword} />
          <div>
            <ButtonSearch type="submit" color="secondary" variant="contained">
              Sign up
            </ButtonSearch>
          </div>
        </Form>
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

export default SignUpForm;
