import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinPath } from 'url-joiner';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { apiMethodsBasicAuth, apiMethodsGoogleAuth, apiMethodsFacebookAuth } from '../api';
import NT from '../constants/notifications-type';
import LN from '../constants/loading-names';
import routes from '../routes';
import config from '../config';
import { withFetcher } from './fetcher';

const ACCESS_TOKEN = 'access_token';

const AuthContext = createContext({});

const generateAppEndpoint = path => (window ? joinPath(`${window.location.origin}/#`, path) : '');

const AuthProviderCmp = ({ handleFetch, enqueueSnackbar, history, children }) => {
  const [tokenData, setTokenData] = useState(JSON.parse(Cookies.get(ACCESS_TOKEN) || null));
  const isLoggedIn = Boolean(tokenData && tokenData.expiresAt - Date.now() > 0);

  const handleSetToken = token => {
    if (!token) {
      throw new Error('token is not passed');
    }
    setTokenData(token);
    Cookies.set(ACCESS_TOKEN, JSON.stringify(token), {
      expires: 1,
      path: config.publicUrl,
    });
    history.push(routes.words.list);
  };

  const handleBasicLogIn = ({ email, password }) =>
    handleFetch(LN.auth.logIn)(async () => {
      const token = await apiMethodsBasicAuth.logIn({ email, password });
      handleSetToken(token);
      enqueueSnackbar('Successfully authorized', { variant: NT.success });
    });

  const handleBasicSignUp = ({ name, email, password, passwordConfirm }) =>
    handleFetch(LN.auth.signUp)(async () => {
      const appEndpoint = generateAppEndpoint(routes.auth.confirm);

      const body = { name, email, password, passwordConfirm, appEndpoint };
      await apiMethodsBasicAuth.signUp(body);
      history.push(routes.auth.checkSignUp);
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
      enqueueSnackbar('Successfully authorized', { variant: NT.success });
    });

  const handleGoogleSignUp = googleToken =>
    handleFetch(LN.auth.signUp)(async () => {
      const apiToken = await apiMethodsGoogleAuth.signUp(googleToken);
      handleSetToken(apiToken);
      enqueueSnackbar('Successfully authorized', { variant: NT.success });
    });

  const handleFacebookLogIn = facebookToken =>
    handleFetch(LN.auth.logIn)(async () => {
      const apiToken = await apiMethodsFacebookAuth.logIn(facebookToken);
      handleSetToken(apiToken);
      enqueueSnackbar('Successfully authorized', { variant: NT.success });
    });

  const handleFacebookSignUp = token =>
    handleFetch(LN.auth.signUp)(async () => {
      const apiToken = await apiMethodsFacebookAuth.signUp(token);
      handleSetToken(apiToken);
      enqueueSnackbar('Successfully authorized', { variant: NT.success });
    });

  const handleLogout = () => {
    setTokenData(null);
    Cookies.remove(ACCESS_TOKEN);
    history.push(routes.auth.logIn);
    enqueueSnackbar('Successfully logged out', { variant: NT.success });
  };

  return (
    <AuthContext.Provider
      value={{
        tokenData,
        isLoggedIn,
        handleBasicLogIn,
        handleBasicSignUp,
        handleBasicForgotPassword,
        handleGoogleLogIn,
        handleGoogleSignUp,
        handleFacebookLogIn,
        handleFacebookSignUp,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const AuthProvider = compose(
  withRouter,
  withFetcher,
  withSnackbar
)(AuthProviderCmp);

const withAuth = Cmp => props => <AuthContext.Consumer>{value => <Cmp {...value} {...props} />}</AuthContext.Consumer>;

export { AuthProvider, withAuth };
