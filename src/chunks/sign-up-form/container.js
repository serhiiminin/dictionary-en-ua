import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { InputPassword, BlockSocial, ButtonSearch, ButtonFacebook, ButtonGoogle } from '../../components';
import config from '../../config';
import SC from './styles';

class SignUpForm extends Component {
  static propTypes = {
    handleBasicSignUp: PropTypes.func.isRequired,
    handleGoogleSignUp: PropTypes.func.isRequired,
    handleFacebookSignUp: PropTypes.func.isRequired,
  };

  state = {
    name: {
      value: '',
    },
    email: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
      isVisible: false,
    },
    repeatPassword: {
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
    const { handleBasicSignUp } = this.props;

    handleBasicSignUp({
      email: email.value,
      password: password.value,
    });
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
    const { email, name, password, repeatPassword } = this.state;

    return (
      <div>
        <SC.Title>First here? Create an account now!</SC.Title>
        <SC.Form onSubmit={this.handleSubmit}>
          <TextField name="name" variant="outlined" label="Name" value={name.value} onChange={this.handleOnChange} />
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
          <InputPassword
            name="repeatPassword"
            isVisible={repeatPassword.isVisible}
            toggleVisibility={this.handleIsVisibleToggle('repeatPassword')}
            onChange={this.handleOnChange}
            value={repeatPassword.value}
            label="Repeat password"
          />
          <div>
            <ButtonSearch type="submit" color="secondary" variant="contained">
              Sign up
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

export default SignUpForm;
