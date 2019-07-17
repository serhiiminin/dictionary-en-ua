import React, { ComponentType, createContext, useState } from 'react';
import { joinPath } from 'url-joiner';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { apiMethodsBasicAuth, apiMethodsGoogleAuth, apiMethodsFacebookAuth } from '../api';
import NT from '../constants/notifications-type';
import LN from '../constants/loading-names';
import routes from '../routes';
import { withFetcher, FI } from './fetcher';
import { withCookies, CI } from './cookies';
import config from '../config';
import { FacebookToken, GoogleToken, Token } from '../types';

interface OwnProps {
  children: JSX.Element;
  enqueueSnackbar(n: string, p: object): void;
}

interface FormData {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

type Props = FI & CI & RouteComponentProps & OwnProps;

const ACCESS_TOKEN = 'access_token';
const IS_SIGN_UP_APPLIED = 'is_sign_up_applied';

const { Provider, Consumer } = createContext({});

const generateAppEndpoint = (path: string): string =>
  window ? joinPath(window.location.origin, config.publicUrl, path) : '';

const AuthProviderCmp = (props: Props): JSX.Element => {
  const { handleFetch, enqueueSnackbar, history, children, getFromCookies, setToCookies, removeFromCookies } = props;
  const [tokenData, setTokenData] = useState<Token | null>(getFromCookies(ACCESS_TOKEN));
  const [isSignUpApplied, setIsSignUpApplied] = useState<boolean>(false);
  const isLoggedIn = Boolean(tokenData && tokenData.expiresAt - Date.now() > 0);

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
    setTokenData(null);
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

  const handleBasicLogIn = ({ email, password }: FormData): Promise<object | void> =>
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const token = await apiMethodsBasicAuth.logIn({ email, password });
        handleSetToken(token);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: NT.success });
      }
    );

  const handleBasicSignUp = ({ name, email, password, passwordConfirm }: FormData): Promise<object | void> =>
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const appEndpoint = generateAppEndpoint(routes.auth.confirm);

        const body = { name, email, password, passwordConfirm, appEndpoint };
        await apiMethodsBasicAuth.signUp(body);
        setEmailConfirmation();
        history.push(routes.auth.checkSignUp);
      }
    );

  const handleConfirmBasicSignUp = (token: string): Promise<object | void> =>
    handleFetch(LN.auth.confirm)(
      async (): Promise<void> => {
        try {
          const tokenSuccess = await apiMethodsBasicAuth.confirm(token);
          if (tokenSuccess) {
            handleSetToken(tokenSuccess);
          }
        } catch (error) {
          history.push(routes.root);
          enqueueSnackbar('This activation reference is invalid or expired', { variant: NT.error.default });
        }
      }
    );

  const handleBasicForgotPassword = ({ email }: FormData): Promise<object | void> =>
    handleFetch(LN.auth.forgotPassword)(
      async (): Promise<void> => {
        const appEndpoint = generateAppEndpoint(routes.auth.forgotPassword);

        await apiMethodsBasicAuth.forgotPassword({ email, appEndpoint });
        enqueueSnackbar('Password is sent! Check your email', { variant: NT.success });
      }
    );

  const handleGoogleLogIn = (googleToken: GoogleToken = {}): Promise<object | void> =>
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsGoogleAuth.logIn(googleToken.accessToken || '');
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: NT.success });
      }
    );

  const handleGoogleSignUp = (googleToken: GoogleToken = {}): Promise<object | void> =>
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsGoogleAuth.signUp(googleToken.accessToken || '');
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: NT.success });
      }
    );

  const handleFacebookLogIn = (facebookToken: FacebookToken = {}): Promise<object | void> =>
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsFacebookAuth.logIn(facebookToken.accessToken || '');
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: NT.success });
      }
    );

  const handleFacebookSignUp = (facebookToken: FacebookToken): Promise<object | void> =>
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsFacebookAuth.signUp(facebookToken.accessToken || '');
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: NT.success });
      }
    );

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

const AuthProvider = compose<Props, {}>(
  withCookies,
  withRouter,
  withFetcher,
  withSnackbar
)(AuthProviderCmp);

export interface AI {
  tokenData: Token;
  isLoggedIn: boolean;
  isSignUpApplied: boolean;
  handleBasicLogIn(fd: FormData): Promise<object | void>;
  handleBasicSignUp(fd: FormData): Promise<object | void>;
  handleConfirmBasicSignUp(t: string): Promise<object | void>;
  handleBasicForgotPassword(fd: FormData): Promise<object | void>;
  handleGoogleLogIn(t: GoogleLoginResponse | GoogleLoginResponseOffline): void;
  handleGoogleSignUp(t: GoogleLoginResponse | GoogleLoginResponseOffline): void;
  handleFacebookLogIn(t: FacebookToken): Promise<object | void>;
  handleFacebookSignUp(t: FacebookToken): Promise<object | void>;
  handleLogout(): Promise<object | void>;
  setEmailConfirmation(): void;
  removeEmailConfirmation(): void;
}

const withAuth = <T extends {}>(Cmp: ComponentType<T>): ((props: T & AI) => JSX.Element) => (
  props: T & AI
): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Consumer>{(context: any): JSX.Element => <Cmp {...context} {...props} />}</Consumer>
);

export { AuthProvider, withAuth };
