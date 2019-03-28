import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Button, TextField, Checkbox, FormControlLabel, LinearProgress, Fade } from '@material-ui/core';
import loadingNames from '../../../constants/loading-names';
import composeClassesPropTypes from '../../../modules/compose-classes-prop-types';
import routes from '../../../routes';
import config from '../../../config';
import styles from './styles';

const email = value => value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value);

class Login extends Component {
  static propTypes = {
    handleBasicLogIn: PropTypes.func.isRequired,
    handleGoogleLogIn: PropTypes.func.isRequired,
    handleFacebookLogIn: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  state = {
    login: {
      value: '',
      isValid: true,
      invalidText: 'Your mail does not match pattern',
    },
    password: {
      value: '',
      isVisible: false,
    },
  };

  static defaultProps = {
    classes: {},
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  passwordVisibleToggle = () =>
    this.setState(prevState => ({
      password: {
        ...prevState.password,
        isVisible: !prevState.password.isVisible,
      },
    }));

  handleSubmit = event => {
    event.preventDefault();
    const { login, password } = this.state;
    const { handleBasicLogIn } = this.props;
    const isMailValid = Boolean(email(login.value));

    if (isMailValid) {
      this.setState(
        prevState => ({
          login: {
            ...prevState.login,
            isValid: true,
          },
        }),
        () => {
          handleBasicLogIn({
            login: login.value,
            password: password.value,
          });
        }
      );
    } else {
      this.setState(prevState => ({
        login: {
          ...prevState.login,
          isValid: false,
        },
      }));
    }
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
    const { login, password } = this.state;
    const { classes, checkIsLoading } = this.props;
    const isLoading = checkIsLoading(loadingNames.auth.logIn);

    return (
      <div className={classes.loginButton}>
        <h1>Login</h1>
        <Fade in={isLoading}>
          <LinearProgress color="secondary" variant="query" />
        </Fade>
        <GoogleLogin clientId={config.auth.google.clientId} onSuccess={this.handleGoogle} />
        <FacebookLogin appId={config.auth.facebook.appId} callback={this.handleFacebook} />
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Email"
            name="login"
            value={login.value}
            error={!login.isValid}
            helperText={login.isValid ? '' : login.invalidText}
            onChange={this.handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            value={password.value}
            type={password.isVisible ? 'text' : 'password'}
            onChange={this.handleInputChange}
          />
          <FormControlLabel
            control={<Checkbox checked={password.isVisible} onChange={this.passwordVisibleToggle} />}
            label="Show password"
          />
          <div>
            <Button type="submit" color="secondary" variant="contained">
              Submit
            </Button>
          </div>
        </form>
        <Link to={routes.auth.signUp}>Do not have an account yet? Sign up</Link>
      </div>
    );
  }
}

export default Login;
