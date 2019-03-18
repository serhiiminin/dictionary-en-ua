import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { Button } from '../../../components';
import composeClassesPropTypes from '../../../modules/compose-classes-prop-types';
import routes from '../../../routes';
import config from '../../../config';
import styles from './styles';

const email = value => value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value);

class Login extends Component {
  static propTypes = {
    handleLogin: PropTypes.func.isRequired,
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

  handleInputChange = key => event => {
    const { value } = event.target;

    this.setState(prevState => ({
      [key]: {
        ...prevState[key],
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
    const { handleLogin } = this.props;
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
          handleLogin({
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

  render() {
    const { login, password } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.loginButton}>
        <h1>Login</h1>
        <GoogleLogin clientId={config.auth.google.clientId} />
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Email"
            value={login.value}
            error={!login.isValid}
            helperText={login.isValid ? '' : login.invalidText}
            onChange={this.handleInputChange('login')}
          />
          <TextField
            label="Password"
            value={password.value}
            type={password.isVisible ? 'text' : 'password'}
            onChange={this.handleInputChange('password')}
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
        <Link to={routes.auth.signup}>Do not have an account yet? Sign up</Link>
      </div>
    );
  }
}

export default Login;
