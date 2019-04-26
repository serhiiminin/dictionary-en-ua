import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import routes from '../../../routes';
import config from '../../../config';

const isEmailValid = value => value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value);

class SignUp extends Component {
  static propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    handleGoogleSignUp: PropTypes.func.isRequired,
    handleFacebookSignUp: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    isPasswordVisible: false,
    isMailValid: true,
  };

  handleInputChange = key => event =>
    this.setState({
      [key]: event.target.value,
      isMailValid: true,
    });

  passwordVisibleToggle = () =>
    this.setState(prevState => ({
      ...prevState,
      isPasswordVisible: !prevState.isPasswordVisible,
    }));

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { handleSignUp } = this.props;
    const isMailValid = Boolean(isEmailValid(email));
    if (isMailValid) {
      this.setState(
        prevState => ({
          ...prevState,
          isMailValid: true,
        }),
        () => {
          handleSignUp({ email, password });
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
    const { email, name, gender, age, password, repeatPassword, isPasswordVisible, isMailValid } = this.state;

    return (
      <div>
        <h1>Sign up</h1>
        <GoogleLogin clientId={config.auth.google.clientId} onSuccess={this.handleGoogle} />
        <FacebookLogin appId={config.auth.facebook.appId} callback={this.handleFacebook} />
        <form onSubmit={this.handleSubmit}>
          <TextField label="Name" value={name} onChange={this.handleInputChange('name')} />
          <TextField label="Gender" value={gender} onChange={this.handleInputChange('gender')} />
          <TextField label="Age" value={age} onChange={this.handleInputChange('age')} />
          <TextField error={!isMailValid} label="Email" value={email} onChange={this.handleInputChange('email')} />
          <TextField
            label="Password"
            value={password}
            type={isPasswordVisible ? 'text' : 'password'}
            onChange={this.handleInputChange('password')}
          />
          <TextField
            label="Repeat password"
            value={repeatPassword}
            type={isPasswordVisible ? 'text' : 'password'}
            onChange={this.handleInputChange('repeatPassword')}
          />
          <FormControlLabel
            control={<Checkbox checked={isPasswordVisible} onChange={this.passwordVisibleToggle} />}
            label="Show password"
          />
          <div>
            <Button type="submit" color="secondary" variant="contained">
              Submit
            </Button>
          </div>
        </form>
        <Link to={routes.auth.logIn}>Already have an account? Log in</Link>
      </div>
    );
  }
}

export default SignUp;
