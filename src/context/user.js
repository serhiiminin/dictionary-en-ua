import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import { compose } from "recompose";
import { apiUsers } from "../api";
import notificationType from "../constants/notifications-type";
import loadingNames from "../constants/loading-names";
import { withLoadingNames } from "./loading-names";
import { withNotifications } from "./notifications";
import routes from "../routes";

const UserContext = createContext({});

const userInitialState = {
  googleToken: JSON.parse(window.localStorage.getItem("google")),
  user: {}
};
class UserProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showNotification: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  };

  state = userInitialState;

  componentDidMount() {
    this.handleFetchUser();
  }

  cleanUser = () => this.setState({ user: userInitialState.user });

  cleanGoogleToken = callback => {
    this.setState({ googleToken: null }, () => {
      window.localStorage.clear("google");
      callback();
    });
  };

  handleFetchUser = () => {
    const { googleToken } = this.state;
    return this.fetchUser((googleToken && googleToken.googleId) || "", googleToken)
      .then(user => (!user ? this.createUser(googleToken && googleToken.profileObj, googleToken) : user))
      .then(this.setUserToState);
  };

  setGoogleToken = (googleToken, callback) => {
    if (googleToken) {
      this.fetchUser(googleToken.googleId, googleToken).then(user =>
        this.setState({ user, googleToken }, () => {
          callback();
          window.localStorage.setItem("google", JSON.stringify(googleToken));
        })
      );
    }
  };

  setUserToState = user => this.setState({ user });

  handleFetch = ({ loadingName, requestHandler, responseHandler }) => {
    const { showNotification, startLoading, stopLoading, history } = this.props;

    return Promise.resolve(startLoading(loadingName))
      .then(requestHandler || (r => r))
      .then(responseHandler || (r => r))
      .catch(err => {
        if (err.message === "Unauthorized") {
          history.push(routes.login);
          return showNotification("You are not authorized! Please, use your google account", notificationType.info);
        }
        return showNotification(err.message, notificationType.error);
      })
      .finally(() => stopLoading(loadingName));
  };

  fetchUser = (googleId, token) =>
    this.handleFetch({
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUsers.get(googleId, token)
    });

  createUser = (user, token) =>
    this.handleFetch({
      loadingName: loadingNames.user.fetch,

      requestHandler: () => apiUsers.create({ ...user }, token),
      responseHandler: () =>
        this.props.showNotification("The user has been saved successfully", notificationType.success)
    });

  editUser = (word, token) =>
    this.handleFetch({
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUsers.update(word, token),
      responseHandler: () =>
        this.props.showNotification("The user has been updated successfully", notificationType.success)
    });

  deleteUser = (id, token) =>
    this.handleFetch({
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUsers.delete(id, token),
      responseHandler: () => this.fetchWordsList()
    }).then(() => this.props.showNotification("The user has been deleted successfully", notificationType.success));

  render() {
    const { user, googleToken } = this.state;
    const { children } = this.props;
    const isUserLoggedIn = googleToken && googleToken.tokenObj.expires_at > Date.now();

    return (
      <UserContext.Provider
        value={{
          user,
          googleToken,
          isUserLoggedIn,
          setGoogleToken: this.setGoogleToken,
          cleanGoogleToken: this.cleanGoogleToken,
          setUserToState: this.setUserToState,
          cleanUser: this.cleanUser,
          fetchUser: this.fetchUser,
          createUser: this.createUser,
          editUser: this.editUser,
          deleteUser: this.deleteUser
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

const UserProvider = compose(
  withRouter,
  withLoadingNames,
  withNotifications
)(UserProviderCmp);

const withUser = Cmp => props => <UserContext.Consumer>{value => <Cmp {...value} {...props} />}</UserContext.Consumer>;

export { UserProvider, withUser };
