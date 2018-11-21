import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { GoogleLogin } from "react-google-login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import notificationType from "../../constants/notifications-type";

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const StyledGoogleLogin = styled(GoogleLogin)`
  background: ${props => props.theme.palette.primary.main};
  &:hover {
    cursor: pointer;
  }
`;

class Login extends Component {
  static propTypes = {
    setGoogleToken: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  };

  onSuccess = response =>
    Promise.resolve(this.props.setGoogleToken(response))
    .then(() => this.props.history.goBack());

  onFailure = error => {
    this.props.showNotification(error.message, notificationType.console.error);
  };

  render() {
    return (
      <StyledGoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
      >
        <AccountCircle />
      </StyledGoogleLogin>
    );
  }
}

export default Login;
