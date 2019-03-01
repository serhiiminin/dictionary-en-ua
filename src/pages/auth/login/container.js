import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { Button } from '../../../components';
import composeClassesPropTypes from '../../../modules/compose-classes-prop-types';
import routes from '../../../routes';
import styles from './styles';

const email = value =>
  value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value);

class Login extends Component {
  static propTypes = {
    handleLogin: PropTypes.func.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  state = {
    login: '',
    password: '',
    isPasswordVisible: false,
    isMailValid: true,
  };

  static defaultProps = {
    classes: {},
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

  handleSubmit = () => {
    const { login, password } = this.state;
    const { handleLogin } = this.props;
    const isMailValid = Boolean(email(login));
    if (isMailValid) {
      this.setState(
        prevState => ({
          ...prevState,
          isMailValid: true,
        }),
        () => {
          handleLogin({ login, password });
        }
      );
    } else {
      this.setState(prevState => ({
        ...prevState,
        isMailValid: false,
      }));
    }
  };

  render() {
    const { login, password, isPasswordVisible, isMailValid } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.loginButton}>
        <h1>Login</h1>
        <form>
          <TextField
            error={!isMailValid}
            label="Email"
            value={login}
            onChange={this.handleInputChange('login')}
          />
          <TextField
            label="Password"
            value={password}
            type={isPasswordVisible ? 'text' : 'password'}
            onChange={this.handleInputChange('password')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isPasswordVisible}
                onChange={this.passwordVisibleToggle}
              />
            }
            label="Show password"
          />
          <div>
            <Button
              onClick={this.handleSubmit}
              color="secondary"
              variant="contained"
            >
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
