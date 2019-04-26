import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import InputPassword from '../input-password';
import ButtonSearch from '../button-search';
import config from '../../config';
import SC from './styles';

const isValidEmail = value => value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value);

class SignUp extends Component {
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
      isVisible: true,
    },
    repeatPassword: {
      value: '',
      isValid: true,
      isVisible: true,
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
    const isMailValid = Boolean(isValidEmail(email));
    if (isMailValid) {
      this.setState(
        prevState => ({
          ...prevState,
          isMailValid: true,
        }),
        () => {
          handleBasicSignUp({ email, password });
        }
      );
    } else {
      this.setState(prevState => ({
        ...prevState,
        isMailValid: false,
      }));
    }
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
    const { email, name, password, repeatPassword, isMailValid } = this.state;

    return (
      <SC.Form>
        <SC.Title>First here? Create an account now!</SC.Title>
        <SC.Form onSubmit={this.handleSubmit}>
          <TextField name="name" variant="outlined" label="Name" value={name.value} onChange={this.handleOnChange} />
          <TextField
            name="email"
            variant="outlined"
            error={!isMailValid}
            label="Email"
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
              Submit
            </ButtonSearch>
          </div>
        </SC.Form>
        <div>
          <GoogleLogin clientId={config.auth.google.clientId} onSuccess={this.handleGoogle} />
          <FacebookLogin appId={config.auth.facebook.appId} callback={this.handleFacebook} />
        </div>
      </SC.Form>
    );
  }
}

export default SignUp;
