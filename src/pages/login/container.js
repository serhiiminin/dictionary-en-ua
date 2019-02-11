import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { GoogleLogin } from 'react-google-login';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '../../components';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

class Login extends Component {
  static propTypes = {
    setGoogleToken: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  static defaultProps = {
    classes: {},
  };

  onSuccess = response =>
    this.props.setGoogleToken(response, () => this.props.history.goBack());

  onFailure = error => this.props.handleError(error);

  render() {
    const { classes } = this.props;

    return (
      <GoogleLogin
        className={classes.loginButton}
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
        color="primary"
        render={renderProps => (
          <Button
            onClick={renderProps.onClick}
            color="secondary"
            variant="contained"
            title="Login with google account"
          >
            <AccountCircle />
            Login with google account
          </Button>
        )}
      />
    );
  }
}

export default Login;
