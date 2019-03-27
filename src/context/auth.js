import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { apiMethodsBasicAuth, apiMethodsGoogleAuth, apiMethodsFacebookAuth } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import routes from '../routes';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../modules/handle-fetch';
import { withErrors } from './errors';
import config from '../config';

const ACCESS_TOKEN = 'access_token';

const AuthContext = createContext({});

const authInitialState = {
  tokenData: JSON.parse(Cookies.get(ACCESS_TOKEN) || null),
};

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

  handleFetch = () => {
    const { startLoading, stopLoading, handleError } = this.props;

    return createHandleFetch({
      startLoading,
      stopLoading,
      errorHandler: handleError,
    });
  };

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
        path: config.publicUrl,
      });
    });

  handleBasicLogIn = ({ login, password }) => {
    const { enqueueSnackbar, history } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.auth.login,
      apiHandler: apiMethodsBasicAuth
        .logIn({ login, password })
        .then(this.setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });
  };

  handleBasicSignUp = ({ login, password }) => {
    const { enqueueSnackbar, history } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.auth.signup,
      apiHandler: apiMethodsBasicAuth.signUp({ login, password }).then(() => {
        history.push(routes.words.list);
        return enqueueSnackbar('Welcome! You have been signed up successfully', {
          variant: notificationType.success,
        });
      }),
    });
  };

  handleGoogleLogIn = token => {
    const { enqueueSnackbar, history } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.auth.login,
      apiHandler: apiMethodsGoogleAuth
        .logIn(token)
        .then(this.setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });
  };

  handleGoogleSignUp = token => {
    const { enqueueSnackbar, history } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.auth.login,
      apiHandler: apiMethodsGoogleAuth
        .signUp(token)
        .then(this.setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });
  };

  handleFacebookLogIn = token => {
    const { enqueueSnackbar, history } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.auth.login,
      apiHandler: apiMethodsFacebookAuth
        .logIn(token)
        .then(this.setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });
  };

  handleFacebookSignUp = token => {
    const { enqueueSnackbar, history } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.auth.login,
      apiHandler: apiMethodsFacebookAuth
        .signUp(token)
        .then(this.setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });
  };

  handleLogout = () => {
    const { enqueueSnackbar, history } = this.props;

    this.setState({ tokenData: null }, () => {
      Cookies.remove(ACCESS_TOKEN);
      history.push(routes.auth.logIn);
      enqueueSnackbar('Successfully logged out', {
        variant: notificationType.success,
      });
    });
  };

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
          handleBasicLogIn: this.handleBasicLogIn,
          handleBasicSignUp: this.handleBasicSignUp,
          handleGoogleLogIn: this.handleGoogleLogIn,
          handleGoogleSignUp: this.handleGoogleSignUp,
          handleFacebookLogIn: this.handleFacebookLogIn,
          handleFacebookSignUp: this.handleFacebookSignUp,
          handleLogout: this.handleLogout,
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

const withAuth = Cmp => props => <AuthContext.Consumer>{value => <Cmp {...value} {...props} />}</AuthContext.Consumer>;

export { AuthProvider, withAuth };
