import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinPath } from 'url-joiner';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { apiMethodsBasicAuth, apiMethodsGoogleAuth, apiMethodsFacebookAuth } from '../api';
import NT from '../constants/notifications-type';
import LN from '../constants/loading-names';
import routes from '../routes';
import { withFetcher } from './fetcher';
import { withCookies } from './cookies';
import config from '../config';

const ACCESS_TOKEN = 'access_token';
const IS_SIGN_UP_APPLIED = 'is_sign_up_applied';

const { Provider, Consumer } = createContext({});

const generateAppEndpoint = path => (window ? joinPath(window.location.origin, config.publicUrl, path) : '');

const AuthProviderCmp = props => {
  const { handleFetch, enqueueSnackbar, history, children, getFromCookies, setToCookies, removeFromCookies } = props;
  const [tokenData, setTokenData] = useState(getFromCookies(ACCESS_TOKEN));
  const [isSignUpApplied, setIsSignUpApplied] = useState(false);
  const isLoggedIn = Boolean(tokenData && tokenData.expiresAt - Date.now() > 0);

  const handleSuccessRedirect = () => {
    history.goBack();
  };

  const handleSetToken = token => {
    if (!token) {
      throw new Error('token is not passed');
    }
    setTokenData(token);
    setToCookies(ACCESS_TOKEN, token);
  };

  const handleCleanToken = () => {
    setTokenData(null);
    removeFromCookies(ACCESS_TOKEN);
  };

  const setEmailConfirmation = () => {
    setToCookies(IS_SIGN_UP_APPLIED, true);
    setIsSignUpApplied(true);
  };

  const removeEmailConfirmation = () => {
    removeFromCookies(IS_SIGN_UP_APPLIED);
    setIsSignUpApplied(false);
  };

  const handleBasicLogIn = ({ email, password }) =>
    handleFetch(LN.auth.logIn)(async () => {
      const token = await apiMethodsBasicAuth.logIn({ email, password });
      handleSetToken(token);
      handleSuccessRedirect();
      enqueueSnackbar('Welcome!', { variant: NT.success });
    });

  const handleBasicSignUp = ({ name, email, password, passwordConfirm }) =>
    handleFetch(LN.auth.signUp)(async () => {
      const appEndpoint = generateAppEndpoint(routes.auth.confirm);

      const body = { name, email, password, passwordConfirm, appEndpoint };
      await apiMethodsBasicAuth.signUp(body);
      setEmailConfirmation();
      history.push(routes.auth.checkSignUp);
    });

  const handleConfirmBasicSignUp = token =>
    handleFetch(LN.auth.confirm)(async () => {
      try {
        const tokenSuccess = await apiMethodsBasicAuth.confirm(token);
        if (tokenSuccess) {
          handleSetToken(tokenSuccess);
        }
      } catch (error) {
        history.push(routes.root);
        enqueueSnackbar('This activation reference is invalid or expired', { variant: NT.error.default });
      }
    });

  const handleBasicForgotPassword = ({ email }) =>
    handleFetch(LN.auth.forgotPassword)(async () => {
      const appEndpoint = generateAppEndpoint(routes.auth.forgotPassword);

      await apiMethodsBasicAuth.forgotPassword({ email, appEndpoint });
      enqueueSnackbar('Password is sent! Check your email', { variant: NT.success });
    });

  const handleGoogleLogIn = googleToken =>
    handleFetch(LN.auth.logIn)(async () => {
      const apiToken = await apiMethodsGoogleAuth.logIn(googleToken);
      handleSetToken(apiToken);
      handleSuccessRedirect();
      enqueueSnackbar('Welcome!', { variant: NT.success });
    });

  const handleGoogleSignUp = googleToken =>
    handleFetch(LN.auth.signUp)(async () => {
      const apiToken = await apiMethodsGoogleAuth.signUp(googleToken);
      handleSetToken(apiToken);
      handleSuccessRedirect();
      enqueueSnackbar('Welcome!', { variant: NT.success });
    });

  const handleFacebookLogIn = facebookToken =>
    handleFetch(LN.auth.logIn)(async () => {
      const apiToken = await apiMethodsFacebookAuth.logIn(facebookToken);
      handleSetToken(apiToken);
      handleSuccessRedirect();
      enqueueSnackbar('Welcome!', { variant: NT.success });
    });

  const handleFacebookSignUp = token =>
    handleFetch(LN.auth.signUp)(async () => {
      const apiToken = await apiMethodsFacebookAuth.signUp(token);
      handleSetToken(apiToken);
      handleSuccessRedirect();
      enqueueSnackbar('Welcome!', { variant: NT.success });
    });

  const handleLogout = () => {
    handleCleanToken();
  };

  return (
    <Provider
      value={{
        tokenData,
        isLoggedIn,
        isSignUpApplied,
        handleBasicLogIn,
        handleBasicSignUp,
        handleConfirmBasicSignUp,
        handleBasicForgotPassword,
        handleGoogleLogIn,
        handleGoogleSignUp,
        handleFacebookLogIn,
        handleFacebookSignUp,
        handleLogout,
        setEmailConfirmation,
        removeEmailConfirmation,
      }}
    >
      {children}
    </Provider>
  );
};

AuthProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
  getFromCookies: PropTypes.func.isRequired,
  setToCookies: PropTypes.func.isRequired,
  removeFromCookies: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const AuthProvider = compose(
  withCookies,
  withRouter,
  withFetcher,
  withSnackbar
)(AuthProviderCmp);

const withAuth = Cmp => props => <Consumer>{value => <Cmp {...value} {...props} />}</Consumer>;

export { AuthProvider, withAuth };
