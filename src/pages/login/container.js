import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { GoogleLogin } from "react-google-login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import notificationType from "../../constants/notifications-type";
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
class Login extends Component {
  static propTypes = {
    setGoogleToken: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  static defaultProps = {
    classes: {}
  }

  onSuccess = response =>
    Promise.resolve(this.props.setGoogleToken(response))
    .then(() => this.props.history.goBack());

  onFailure = error => {
    this.props.showNotification(error.message, notificationType.console.error);
  };

  render() {
    const { classes } = this.props;

    return (
      <GoogleLogin
        className={classes.loginButton}
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
      >
        <AccountCircle />
      </GoogleLogin>
    );
  }
}

export default Login;
