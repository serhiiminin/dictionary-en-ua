import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import InputPassword from '../input-password';
import BlockSocial from '../block-social';
import ButtonSearch from '../button-search';
import ButtonFacebook from '../button-facebook';
import ButtonGoogle from '../button-google';
import config from '../../config';
import SC from './styles';

class Login extends Component {
  static propTypes = {
    handleBasicLogIn: PropTypes.func.isRequired,
    handleGoogleLogIn: PropTypes.func.isRequired,
    handleFacebookLogIn: PropTypes.func.isRequired,
  };

  state = {
    email: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
      isVisible: false,
    },
  };

  handleOnChange = event => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  handleIsVisibleToggle = key => () => {
    this.setState(prevState => ({
      [key]: {
        ...prevState[key],
        isVisible: !prevState[key].isVisible,
      },
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { handleBasicLogIn } = this.props;

    handleBasicLogIn({ email, password });
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
    const { email, password } = this.state;

    return (
      <div>
        <SC.Title>Welcome back, friend!</SC.Title>
        <SC.Form onSubmit={this.handleSubmit}>
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            error={!email.isValid}
            value={email.value}
            onChange={this.handleOnChange}
          />
          <InputPassword
            name="password"
            isVisible={password.isVisible}
            toggleVisibility={this.handleIsVisibleToggle('password')}
            onChange={this.handleOnChange}
            value={password.value}
            label="Password"
          />
          <div>
            <ButtonSearch type="submit" color="secondary" variant="contained">
              Log in
            </ButtonSearch>
          </div>
        </SC.Form>
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

export default Login;
