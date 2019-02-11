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

const GOOGLE_TOKEN = 'google';

const UserContext = createContext({});

const userInitialState = {
  googleToken:
    Cookies.get(GOOGLE_TOKEN) && JSON.parse(Cookies.get(GOOGLE_TOKEN)),
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

  componentDidMount() {
    this.handleFetchUser();
  }

  handleFetchUser = () => {
    const { googleToken } = this.state;
    return this.fetchUser(
      (googleToken && googleToken.googleId) || '',
      googleToken
    )
      .then(
        user =>
          user ||
          this.createUser(googleToken && googleToken.profile, googleToken)
      )
      .then(this.setUserToState);
  };

  cleanUser = () => this.setState({ user: userInitialState.user });

  cleanGoogleToken = callback => {
    this.setState({ googleToken: null }, () => {
      Cookies.remove(GOOGLE_TOKEN);
      callback();
    });
  };

  setGoogleToken = (googleToken, callback) =>
    this.fetchUser(googleToken.googleId, googleToken).then(user =>
      this.setState({ user, googleToken }, () => {
        callback();
        Cookies.set(
          GOOGLE_TOKEN,
          JSON.stringify({
            token: googleToken.Zi,
            profile: googleToken.profileObj,
          })
        );
      })
    );

  setUserToState = user => this.setState({ user });

  fetchUser = (googleId, token) =>
    this.handleFetch({
      googleToken: this.state.googleToken,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.get(googleId, token),
    });

  createUser = (user, token) =>
    this.handleFetch({
      googleToken: this.state.googleToken,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.create({ ...user }, token),
      responseHandler: () =>
        this.props.enqueueSnackbar('The user has been saved successfully', {
          variant: notificationType.success,
        }),
    });

  editUser = (word, token) =>
    this.handleFetch({
      googleToken: this.state.googleToken,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.update(word, token),
      responseHandler: () =>
        this.props.enqueueSnackbar('The user has been updated successfully', {
          variant: notificationType.success,
        }),
    });

  deleteUser = (id, token) =>
    this.handleFetch({
      googleToken: this.state.googleToken,
      loadingName: loadingNames.user.fetch,
      requestHandler: () => apiUser.delete(id, token),
      responseHandler: () => this.fetchWordsList(),
    }).then(() =>
      this.props.enqueueSnackbar('The user has been deleted successfully', {
        variant: notificationType.success,
      })
    );

  render() {
    const { user, googleToken } = this.state;
    const { children } = this.props;
    const isUserLoggedIn =
      googleToken &&
      googleToken.token &&
      googleToken.token.expires_at > Date.now();

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
