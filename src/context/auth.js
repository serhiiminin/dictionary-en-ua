import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { apiAuth } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import routes from '../routes';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../modules/handle-fetch';
import { withErrors } from './errors';

const ACCESS_TOKEN = 'access_token';

const AuthContext = createContext({});

const authInitialState = {
  tokenData: JSON.parse(Cookies.get(ACCESS_TOKEN) || null),
};

const { PUBLIC_URL } = process.env;

class AuthProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  };

  state = authInitialState;

  handleFetch = createHandleFetch({
    startLoading: this.props.startLoading,
    stopLoading: this.props.stopLoading,
    errorHandler: this.props.handleError,
  });

  cleanToken = callback => {
    this.setState({ tokenData: null }, () => {
      Cookies.remove(ACCESS_TOKEN);
      callback();
    });
  };

  setToken = tokenData =>
    this.setState({ tokenData }, () => {
      Cookies.set(ACCESS_TOKEN, JSON.stringify(tokenData), {
        expires: 1,
        path: PUBLIC_URL,
      });
    });

  handleLogin = ({ login, password }) =>
    this.handleFetch({
      loadingName: loadingNames.auth.login,
      requestHandler: () =>
        apiAuth.logIn({ login, password }).then(this.setToken),
      responseHandler: () =>
        this.props.enqueueSnackbar('Successfully authorized', {
          variant: notificationType.success,
        }),
    });

  handleLogout = () => {
    this.setState({ tokenData: null }, () => {
      Cookies.remove(ACCESS_TOKEN);
      this.props.history.push(routes.root);
    });
  };

  handleSignUp = ({ login, password }) =>
    this.handleFetch({
      loadingName: loadingNames.auth.signup,
      requestHandler: () =>
        apiAuth.signUp({
          login,
          password,
        }),
      responseHandler: () =>
        this.props.enqueueSnackbar(
          'Welcome! You have been signed up successfully',
          {
            variant: notificationType.success,
          }
        ),
    });

  render() {
    const { tokenData } = this.state;
    const { children } = this.props;
    const isLoggedIn = tokenData && tokenData.expiresAt - Date.now() > 0;

    return (
      <AuthContext.Provider
        value={{
          tokenData,
          isLoggedIn: Boolean(isLoggedIn),
          setToken: this.setToken,
          cleanToken: this.cleanToken,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleSignUp: this.handleSignUp,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

const AuthProvider = compose(
  withRouter,
  withLoadingNames,
  withSnackbar,
  withErrors
)(AuthProviderCmp);

const withAuth = Cmp => props => (
  <AuthContext.Consumer>
    {value => <Cmp {...value} {...props} />}
  </AuthContext.Consumer>
);

export { AuthProvider, withAuth };
