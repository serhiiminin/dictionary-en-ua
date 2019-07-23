import React, { ComponentType, createContext, useState } from 'react';
import { joinPath } from 'url-joiner';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { apiMethodsBasicAuth, apiMethodsGoogleAuth, apiMethodsFacebookAuth } from '../api';
import LN from '../constants/loading-names';
import routes from '../routes';
import { withFetcher, FI } from './fetcher';
import { withCookies, CI } from './cookies';
import config from '../config';
import { FacebookToken, GoogleToken, Token, FormData } from '../types';

interface OwnProps {
  children: JSX.Element;
}

type Props = FI & CI & RouteComponentProps & WithSnackbarProps & OwnProps;

const ACCESS_TOKEN = 'access_token';
const IS_SIGN_UP_APPLIED = 'is_sign_up_applied';

const { Provider, Consumer } = createContext({});

const generateAppEndpoint = (path: string): string =>
  window ? joinPath(window.location.origin, config.publicUrl, path) : '';

const initialToken = {
  _id: '',
  token: '',
  email: '',
  expiresAt: 0,
};

const AuthProviderCmp = (props: Props): JSX.Element => {
  const { handleFetch, enqueueSnackbar, history, children, getFromCookies, setToCookies, removeFromCookies } = props;
  const [tokenData, setTokenData] = useState<Token>(getFromCookies(ACCESS_TOKEN) || initialToken);
  const [isSignUpApplied, setIsSignUpApplied] = useState<boolean>(false);
  const isLoggedIn = Boolean(tokenData.expiresAt - Date.now() > 0);

  const handleSuccessRedirect = (): void => {
    history.goBack();
  };

  const handleSetToken = (token: Token): void => {
    if (!token) {
      throw new Error('token is not passed');
    }
    setTokenData(token);
    setToCookies(ACCESS_TOKEN, token);
  };

  const handleCleanToken = (): void => {
    setTokenData(initialToken);
    removeFromCookies(ACCESS_TOKEN);
  };

  const setEmailConfirmation = (): void => {
    setToCookies(IS_SIGN_UP_APPLIED, true);
    setIsSignUpApplied(true);
  };

  const removeEmailConfirmation = (): void => {
    removeFromCookies(IS_SIGN_UP_APPLIED);
    setIsSignUpApplied(false);
  };

  const handleBasicLogIn = ({ email, password }: FormData): void => {
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const token = await apiMethodsBasicAuth.logIn<Token>({ email, password });
        handleSetToken(token);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  };

  const handleBasicSignUp = ({ name, email, password, passwordConfirm }: FormData): void => {
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const appEndpoint = generateAppEndpoint(routes.auth.confirm);

        const body = { name, email, password, passwordConfirm, appEndpoint };
        await apiMethodsBasicAuth.signUp<Token>(body);
        setEmailConfirmation();
        history.push(routes.auth.checkSignUp);
      }
    );
  };

  const handleConfirmBasicSignUp = (token: string): void => {
    handleFetch(LN.auth.confirm)(
      async (): Promise<void> => {
        try {
          const tokenSuccess = await apiMethodsBasicAuth.confirm<Token>(token);
          if (tokenSuccess) {
            handleSetToken(tokenSuccess);
          }
        } catch (error) {
          history.push(routes.root);
          enqueueSnackbar('This activation reference is invalid or expired', { variant: 'error' });
        }
      }
    );
  };

  const handleBasicForgotPassword = ({ email }: FormData): void => {
    handleFetch(LN.auth.forgotPassword)(
      async (): Promise<void> => {
        const appEndpoint = generateAppEndpoint(routes.auth.forgotPassword);

        await apiMethodsBasicAuth.forgotPassword<Token>({ email, appEndpoint });
        enqueueSnackbar('Password is sent! Check your email', { variant: 'success' });
      }
    );
  };

  const handleGoogleLogIn = (googleToken: GoogleToken = {}): void => {
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsGoogleAuth.logIn<Token>(googleToken.accessToken || '');
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  };

  const handleGoogleSignUp = (googleToken: GoogleToken = {}): void => {
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsGoogleAuth.signUp<Token>(googleToken.accessToken || '');
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  };

  const handleFacebookLogIn = (facebookToken: FacebookToken = {}): void => {
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsFacebookAuth.logIn<Token>(facebookToken.accessToken || '');
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  };

  const handleFacebookSignUp = (facebookToken: FacebookToken): void => {
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsFacebookAuth.signUp<Token>(facebookToken.accessToken || '');
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  };

  const handleLogout = (): void => {
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

const AuthProvider = compose<Props, OwnProps>(
  withCookies,
  withRouter,
  withFetcher,
  withSnackbar
)(AuthProviderCmp);

export interface AI {
  tokenData: Token;
  isLoggedIn: boolean;
  isSignUpApplied: boolean;
  handleBasicLogIn(fd: FormData): void;
  handleBasicSignUp(fd: FormData): void;
  handleConfirmBasicSignUp(t: string): void;
  handleBasicForgotPassword(fd: FormData): void;
  handleGoogleLogIn(t: GoogleLoginResponse | GoogleLoginResponseOffline): void;
  handleGoogleSignUp(t: GoogleLoginResponse | GoogleLoginResponseOffline): void;
  handleFacebookLogIn(t: FacebookToken): void;
  handleFacebookSignUp(t: FacebookToken): void;
  handleLogout(): void;
  setEmailConfirmation(): void;
  removeEmailConfirmation(): void;
}

const withAuth = <T extends {}>(Cmp: ComponentType<T>): ((props: T & AI) => JSX.Element) => (
  props: T & AI
): JSX.Element => <Consumer>{(context: {}): JSX.Element => <Cmp {...context} {...props} />}</Consumer>;

export { AuthProvider, withAuth };
