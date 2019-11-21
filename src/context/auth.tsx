import React, { createContext, useState, useContext, useCallback } from 'react';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { joinPath } from 'url-joiner';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { apiMethodsBasicAuth, apiMethodsGoogleAuth, apiMethodsFacebookAuth } from '../api';
import LN from '../constants/loading-names';
import routes from '../routes';
import { CookiesContext } from './cookies';
import config from '../config';
import { Token, FormData } from '../types';
import { FetcherContext } from './fetcher';

interface Props {
  children: JSX.Element;
}

type GoogleResponse = (GoogleLoginResponse | GoogleLoginResponseOffline) & {
  accessToken: string;
};

type FacebookResponse = {
  accessToken: string;
};

interface AI {
  tokenData: Token;
  isLoggedIn: boolean;
  isSignUpApplied: boolean;
  handleBasicLogIn(fd: FormData): void;
  handleBasicSignUp(fd: FormData): void;
  handleConfirmBasicSignUp(t: string): void;
  handleBasicForgotPassword(fd: FormData): void;
  handleGoogleLogIn(t: GoogleLoginResponse | GoogleLoginResponseOffline): void;
  handleGoogleSignUp(t: GoogleLoginResponse | GoogleLoginResponseOffline): void;
  handleFacebookLogIn(t: FacebookResponse): void;
  handleFacebookSignUp(t: FacebookResponse): void;
  handleLogout(): void;
  setEmailConfirmation(): void;
  removeEmailConfirmation(): void;
}

const AuthContext = createContext({} as AI);

const ACCESS_TOKEN = 'access_token';
const IS_SIGN_UP_APPLIED = 'is_sign_up_applied';

const generateAppEndpoint = (path: string): string =>
  window ? joinPath(window.location.origin, config.publicUrl, path) : '';

const AuthProvider = ({ children }: Props): JSX.Element => {
  const { handleFetch } = useContext(FetcherContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { getFromCookies, setToCookies, removeFromCookies } = useContext(CookiesContext);
  const [tokenData, setTokenData] = useState(getFromCookies(ACCESS_TOKEN));
  const [isSignUpApplied, setIsSignUpApplied] = useState<boolean>(false);
  const isLoggedIn = Boolean(tokenData.expiresAt - Date.now() > 0);

  const handleSuccessRedirect = (): void => {
    history.goBack();
  };

  const handleSetToken = useCallback((token: Token): void => {
    if (!token) {
      throw new Error('token is not passed');
    }
    setTokenData(token);
    setToCookies(ACCESS_TOKEN, token);
  }, []);

  const handleCleanToken = useCallback((): void => {
    setTokenData(null);
    removeFromCookies(ACCESS_TOKEN);
  }, []);

  const setEmailConfirmation = useCallback((): void => {
    setToCookies(IS_SIGN_UP_APPLIED, true);
    setIsSignUpApplied(true);
  }, []);

  const removeEmailConfirmation = useCallback((): void => {
    removeFromCookies(IS_SIGN_UP_APPLIED);
    setIsSignUpApplied(false);
  }, []);

  const handleBasicLogIn = useCallback(({ email, password }: FormData): void => {
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const token = await apiMethodsBasicAuth.logIn({ email, password });
        handleSetToken(token);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  }, []);

  const handleBasicSignUp = useCallback(({ name, email, password, passwordConfirm }: FormData): void => {
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const appEndpoint = generateAppEndpoint(routes.auth.confirm);

        await apiMethodsBasicAuth.signUp({ name, email, password, passwordConfirm, appEndpoint });
        setEmailConfirmation();
        history.push(routes.auth.checkSignUp);
      }
    );
  }, []);

  const handleConfirmBasicSignUp = useCallback((token: string): void => {
    handleFetch(LN.auth.confirm)(
      async (): Promise<void> => {
        try {
          const tokenSuccess = await apiMethodsBasicAuth.confirm(token);
          if (tokenSuccess) {
            handleSetToken(tokenSuccess);
          }
        } catch (err) {
          history.push(routes.root);
          enqueueSnackbar('This activation reference is invalid or expired', { variant: 'error' });
        }
      }
    );
  }, []);

  const handleBasicForgotPassword = useCallback(({ email }: FormData): void => {
    handleFetch(LN.auth.forgotPassword)(
      async (): Promise<void> => {
        const appEndpoint = generateAppEndpoint(routes.auth.forgotPassword);
        await apiMethodsBasicAuth.forgotPassword({ email, appEndpoint });
        enqueueSnackbar('Password is sent! Check your email', { variant: 'success' });
      }
    );
  }, []);

  const handleGoogleLogIn = useCallback((googleToken: GoogleResponse): void => {
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsGoogleAuth.logIn(googleToken.accessToken);
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  }, []);

  const handleGoogleSignUp = useCallback((googleToken: GoogleResponse): void => {
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsGoogleAuth.signUp(googleToken.accessToken);
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  }, []);

  const handleFacebookLogIn = useCallback((facebookToken: FacebookResponse): void => {
    handleFetch(LN.auth.logIn)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsFacebookAuth.logIn(facebookToken.accessToken);
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  }, []);

  const handleFacebookSignUp = useCallback((facebookToken: FacebookResponse): void => {
    handleFetch(LN.auth.signUp)(
      async (): Promise<void> => {
        const apiToken = await apiMethodsFacebookAuth.signUp(facebookToken.accessToken);
        handleSetToken(apiToken);
        handleSuccessRedirect();
        enqueueSnackbar('Welcome!', { variant: 'success' });
      }
    );
  }, []);

  const handleLogout = useCallback((): void => {
    handleCleanToken();
  }, []);

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
