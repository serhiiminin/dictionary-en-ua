import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import composeClassesPropTypes from '../../../modules/compose-classes-prop-types';
import routes from '../../../routes';
import styles from './styles';

const email = value => value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value);

class Signup extends Component {
  static propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  state = {
    name: '',
    gender: '',
    age: '',
    login: '',
    password: '',
    repeatPassword: '',
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

  handleSubmit = event => {
    event.preventDefault();
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
    const { login, name, gender, age, password, repeatPassword, isPasswordVisible, isMailValid } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.signupButton}>
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField label="Name" value={name} onChange={this.handleInputChange('name')} />
          <TextField label="Gender" value={gender} onChange={this.handleInputChange('gender')} />
          <TextField label="Age" value={age} onChange={this.handleInputChange('age')} />
          <TextField error={!isMailValid} label="Email" value={login} onChange={this.handleInputChange('login')} />
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

export default Signup;
