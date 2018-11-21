import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { GoogleLogout } from "react-google-login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import routes from "../../routes";
import notificationType from "../../constants/notifications-type";

const StyledGoogleLogout = styled(GoogleLogout)`
  background: ${props => props.theme.palette.primary.main};
  &:hover {
    cursor: pointer;
  }
`;

class Logout extends Component {
  static propTypes = {
    cleanGoogleToken: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  };

  onSuccess = () => 
    Promise.resolve(() => this.props.cleanGoogleToken())
    .then(() => this.props.showNotification('You were successfully logged out!', notificationType.success))
    .then(() => this.props.history.push(routes.login));

  render() {
    return (
      <StyledGoogleLogout
        onLogoutSuccess={this.onSuccess}
      >
        <AccountCircle />
      </StyledGoogleLogout>
    );
  }
}

export default Logout;
