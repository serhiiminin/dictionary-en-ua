import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import { compose } from "recompose";
import { apiUser } from "../api";
import notificationType from "../constants/notifications-type";
import loadingNames from "../constants/loading-names";
import { withLoadingNames } from "./loading-names";
import { withNotifications } from "./notifications";
import createHandleFetch from "../helpers/handle-fetch";
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

  handleFetch = createHandleFetch({
    startLoading: this.props.startLoading,
    stopLoading: this.props.stopLoading,
    errorHandler: err => {
      if (err.message === notificationType.error.forbidden) {
        this.props.history.push(routes.login);
        return this.props.showNotification(
          "You are not authorized! Please, use your google account",
          notificationType.info
        );
      }
      return this.props.showNotification(err.message, notificationType.error.default);
    }
  });

  componentDidMount() {
    this.handleFetchUser();
  }

  handleFetchUser = () => {
    const { googleToken } = this.state;
    return this.fetchUser((googleToken && googleToken.googleId) || "", googleToken)
      .then(user => user || this.createUser(googleToken && googleToken.profileObj, googleToken))
      .then(this.setUserToState);
  };

  cleanUser = () => this.setState({ user: userInitialState.user });

  cleanGoogleToken = callback => {
    this.setState({ googleToken: null }, () => {
      window.localStorage.clear("google");
      callback();
    });
  };

  setGoogleToken = (googleToken, callback) =>
    this.fetchUser(googleToken.googleId, googleToken).then(user =>
      this.setState({ user, googleToken }, () => {
        callback();
        window.localStorage.setItem("google", JSON.stringify(googleToken));
      })
    );

  setUserToState = user => this.setState({ user });

  fetchUser = (googleId, token) =>
    this.handleFetch({
      googleToken: this.state.googleToken,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.get(googleId, token)
    });

  createUser = (user, token) =>
    this.handleFetch({
      googleToken: this.state.googleToken,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.create({ ...user }, token),
      responseHandler: () =>
        this.props.showNotification("The user has been saved successfully", notificationType.success)
    });

  editUser = (word, token) =>
    this.handleFetch({
      googleToken: this.state.googleToken,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.update(word, token),
      responseHandler: () =>
        this.props.showNotification("The user has been updated successfully", notificationType.success)
    });

  deleteUser = (id, token) =>
    this.handleFetch({
      googleToken: this.state.googleToken,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.delete(id, token),
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
        }}>
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
