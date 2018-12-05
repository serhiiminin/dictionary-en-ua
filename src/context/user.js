import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from "react-router-prop-types";
import { compose } from "recompose";
import { apiUsers } from "../api";
import notificationType from "../constants/notifications-type";
import loadingNames from "../constants/loading-names";
import { withLoadingNames } from "./loading-names";
import { withNotifications } from "./notifications";
import { withTokens } from "./tokens";
import routes from "../routes";

const UserContext = createContext({});

const userInitialState = {
  user: {}
};
class UserProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showNotification: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    googleToken: PropTypes.shape({})
  };

  static defaultProps = {
    googleToken: null
  };

  state = userInitialState;

  cleanUser = () => this.setState({ user: userInitialState.user });

  setUserToState = user => this.setState({ user });

  handleFetch = ({ loadingName, requestHandler, responseHandler }) => {
    const { showNotification, startLoading, stopLoading, googleToken, history } = this.props;

    return Promise.resolve(startLoading(loadingName))
      .then(() => requestHandler(googleToken))
      .then(responseHandler)
      .catch(err => {
        if (err.message === "Unauthorized") {
          history.push(routes.login);
          return showNotification("You are not authorized! Please, use your google account", notificationType.info);
        }
        return showNotification(err.message, notificationType.error);
      })
      .finally(() => stopLoading(loadingName));
  };

  fetchUser = googleId => this.handleFetch({
      loadingName: loadingNames.fetchWord,
      requestHandler: token => apiUsers.get(googleId, token),
      responseHandler: user => this.setState({ user })
    });

  createUser = user =>
    this.handleFetch({
      loadingName: loadingNames.saveWord,

      requestHandler: tokenData =>
        apiUsers.create(
          {
            ...user,
            googleId: tokenData && tokenData.googleId
          },
          tokenData
        ),
      responseHandler: () =>
        this.props.showNotification("The user has been saved successfully", notificationType.success)
    });

  editUser = word =>
    this.handleFetch({
      loadingName: loadingNames.fetchWord,
      requestHandler: token => apiUsers.update(word, token),
      responseHandler: () =>
        this.props.showNotification("The user has been updated successfully", notificationType.success)
    });

  deleteUser = id =>
    this.handleFetch({
      loadingName: loadingNames.deleteWord,
      requestHandler: token => apiUsers.delete(id, token),
      responseHandler: () => this.fetchWordsList()
    }).then(() => this.props.showNotification("The user has been deleted successfully", notificationType.success));

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return (
      <UserContext.Provider
        value={{
          user,
          setUserToState: this.setUserToState,
          cleanUser: this.cleanUser,
          fetchUser: this.fetchUser,
          createUser: this.createUser,
          editUser: this.editUser,
          deleteUser: this.deleteUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

const UserProvider = compose(
  withRouter,
  withTokens,
  withLoadingNames,
  withNotifications
)(UserProviderCmp);

const withUser = Cmp => props => <UserContext.Consumer>{value => <Cmp {...value} {...props} />}</UserContext.Consumer>;

export { UserProvider, withUser };
