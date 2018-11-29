import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { GoogleLogout } from "react-google-login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button } from "../../components";
import routes from "../../routes";
import notificationType from "../../constants/notifications-type";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

class Logout extends Component {
  static propTypes = {
    cleanGoogleToken: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    classes: composeClassesPropTypes(styles)
  };

  static defaultProps = {
    classes: {}
  };

  onSuccess = () =>
    this.props.cleanGoogleToken(() => {
      this.props.showNotification(
        "You were successfully logged out!",
        notificationType.success
      );
      this.props.history.push(routes.login);
    });

  render() {
    const { classes } = this.props;

    return (
      <GoogleLogout
        className={classes.logoutButton}
        onLogoutSuccess={this.onSuccess}
        render={renderProps => (
          <Button
            onClick={renderProps.onClick}
            color="secondary"
            variant="contained"
            title="Logout"
          >
            <AccountCircle /> Logout
          </Button>
        )}
      >
        <AccountCircle />
      </GoogleLogout>
    );
  }
}

export default Logout;
