import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { Button } from '../../components';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const email = value =>
  value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value);

class Signup extends Component {
  static propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
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
    const { handleSignUp } = this.props;
    const isMailValid = Boolean(email(login));
    if (isMailValid) {
      this.setState(
        prevState => ({
          ...prevState,
          isMailValid: true,
        }),
        () => {
          handleSignUp({ login, password });
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
      <div className={classes.signupButton}>
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
      </div>
    );
  }
}

export default Signup;
