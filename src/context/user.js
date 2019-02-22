import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { apiUser } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../modules/handle-fetch';
import { withErrors } from './errors';

const ACCESS_TOKEN = 'access_token';

const UserContext = createContext({});

const userInitialState = {
  user: {},
};
class UserProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
  };

  state = userInitialState;

  handleFetch = createHandleFetch({
    startLoading: this.props.startLoading,
    stopLoading: this.props.stopLoading,
    errorHandler: this.props.handleError,
  });

  // componentDidMount() {
  //   this.handleFetchUser();
  // }

  handleFetchUser = () => {
    return this.fetchUser(this.state.token || '', this.state.token)
      .then(user => user || this.createUser(this.state.token, this.state.token))
      .then(this.setUserToState);
  };

  cleanUser = () => this.setState({ user: userInitialState.user });

  cleanGoogleToken = callback => {
    this.setState({ token: null }, () => {
      Cookies.remove(ACCESS_TOKEN);
      callback();
    });
  };

  setGoogleToken = (token, callback) =>
    this.fetchUser(token).then(user =>
      this.setState({ user, token }, () => {
        callback();
        Cookies.set(ACCESS_TOKEN, token);
      })
    );

  setUserToState = user => this.setState({ user });

  fetchUser = (googleId, token) =>
    this.handleFetch({
      token: this.state.token,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.get(googleId, token),
    });

  createUser = (user, token) =>
    this.handleFetch({
      token: this.state.token,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.create({ ...user }, token),
      responseHandler: () =>
        this.props.enqueueSnackbar('The user has been saved successfully', {
          variant: notificationType.success,
        }),
    });

  editUser = (word, token) =>
    this.handleFetch({
      token: this.state.token,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.update(word, token),
      responseHandler: () =>
        this.props.enqueueSnackbar('The user has been updated successfully', {
          variant: notificationType.success,
        }),
    });

  deleteUser = (id, token) =>
    this.handleFetch({
      token: this.state.token,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.delete(id, token),
      responseHandler: () => this.fetchWordsList(),
    }).then(() =>
      this.props.enqueueSnackbar('The user has been deleted successfully', {
        variant: notificationType.success,
      })
    );

  render() {
    const { user, token } = this.state;
    const { children } = this.props;

    return (
      <UserContext.Provider
        value={{
          user,
          token,
          isUserLoggedIn: token,
          setGoogleToken: this.setGoogleToken,
          cleanGoogleToken: this.cleanGoogleToken,
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
  withLoadingNames,
  withSnackbar,
  withErrors
)(UserProviderCmp);

const withUser = Cmp => props => (
  <UserContext.Consumer>
    {value => <Cmp {...value} {...props} />}
  </UserContext.Consumer>
);

export { UserProvider, withUser };
