import createFetcherJson from './fetcher';
import config from '../config';
import { Fetcher, Token, FormData } from '../types';

interface Basic {
  logIn(body: FormData): Promise<Token>;
  signUp(body: FormData): Promise<Token>;
  confirm(token: string): Promise<Token>;
  forgotPassword(body: FormData): Promise<Token>;
  resetPassword(body: FormData): Promise<Token>;
}

type BR = (f: Fetcher) => Basic;

const createApiBasicAuth = (endpoint: string): BR => (fetcher: Fetcher): Basic => ({
  logIn: (body: object): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/log-in`,
      method: 'POST',
      body,
    }),
  signUp: (body: object): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/sign-up`,
      method: 'POST',
      body,
    }),
  confirm: (token: string): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/confirm`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
  forgotPassword: (body: object): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/forgot-password`,
      method: 'POST',
      body,
    }),
  resetPassword: (body: object): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/reset-password`,
      method: 'POST',
      body,
    }),
});

interface Social {
  logIn(token: string): Promise<Token>;
  signUp(token: string): Promise<Token>;
}

type SR = (f: Fetcher) => Social;

const createApiGoogleAuth = (endpoint: string): SR => (fetcher: Fetcher): Social => ({
  logIn: (token: string): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/log-in`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
  signUp: (token: string): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/sign-up`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
});

const createApiFacebookAuth = (endpoint: string): SR => (fetcher: Fetcher): Social => ({
  logIn: (token: string): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/log-in`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
  signUp: (token: string): Promise<Token> =>
    fetcher({
      endpoint: `${endpoint}/sign-up`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
});

const fetcherJson = createFetcherJson(window.fetch);

const AUTH = 'auth';
const endpointBasic = `${config.endpoints.api}/${AUTH}/basic`;
const endpointGoogle = `${config.endpoints.api}/${AUTH}/google`;
const endpointFacebook = `${config.endpoints.api}/${AUTH}/facebook`;

const apiMethodsBasicAuth = createApiBasicAuth(endpointBasic)(fetcherJson);
const apiMethodsGoogleAuth = createApiGoogleAuth(endpointGoogle)(fetcherJson);
const apiMethodsFacebookAuth = createApiFacebookAuth(endpointFacebook)(fetcherJson);

export {
  createApiBasicAuth,
  createApiGoogleAuth,
  createApiFacebookAuth,
  apiMethodsBasicAuth,
  apiMethodsGoogleAuth,
  apiMethodsFacebookAuth,
};
