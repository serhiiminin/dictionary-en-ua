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

class LoginForm extends Component {
  static propTypes = {
    handleBasicLogIn: PropTypes.func.isRequired,
    handleGoogleLogIn: PropTypes.func.isRequired,
    handleFacebookLogIn: PropTypes.func.isRequired,
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
    const initialValues = {
      email: '',
      password: '',
    };

    return (
      <div>
        <SC.Title>Welcome back, friend!</SC.Title>
        <Form initialValues={initialValues} onSubmit={this.handleSubmit}>
          <FormField name="email" variant="outlined" label="Email" />
          <FormField name="password" label="Password" variant="outlined" component={InputPassword} />
          <div>
            <ButtonSearch type="submit" color="secondary" variant="contained">
              Log in
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

export default LoginForm;
