import createFetcherJson from './fetcher';
import config from '../config';
import { Fetcher } from '../types';

interface Basic {
  logIn<T>(body: object): Promise<T>;
  signUp<T>(body: object): Promise<T>;
  confirm<T>(token: string): Promise<T>;
  forgotPassword<T>(body: object): Promise<T>;
  resetPassword<T>(body: object): Promise<T>;
}

type BR = (f: Fetcher) => Basic;

const createApiBasicAuth = (endpoint: string): BR => (fetcher: Fetcher): Basic => ({
  logIn: <T>(body: object): Promise<T> =>
    fetcher<T>({
      endpoint: `${endpoint}/log-in`,
      method: 'POST',
      body,
    }),
  signUp: <T>(body: object): Promise<T> =>
    fetcher<T>({
      endpoint: `${endpoint}/sign-up`,
      method: 'POST',
      body,
    }),
  confirm: <T>(token: string): Promise<T> =>
    fetcher<T>({
      endpoint: `${endpoint}/confirm`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
  forgotPassword: <T>(body: object): Promise<T> =>
    fetcher<T>({
      endpoint: `${endpoint}/forgot-password`,
      method: 'POST',
      body,
    }),
  resetPassword: <T>(body: object): Promise<T> =>
    fetcher<T>({
      endpoint: `${endpoint}/reset-password`,
      method: 'POST',
      body,
    }),
});

interface Social {
  logIn<T>(token: string): Promise<T>;
  signUp<T>(token: string): Promise<T>;
}

type SR = (f: Fetcher) => Social;

const createApiGoogleAuth = (endpoint: string): SR => (fetcher: Fetcher): Social => ({
  logIn: <T>(token: string): Promise<T> =>
    fetcher<T>({
      endpoint: `${endpoint}/log-in`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
  signUp: <T>(token: string): Promise<T> =>
    fetcher<T>({
      endpoint: `${endpoint}/sign-up`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
});

const createApiFacebookAuth = (endpoint: string): SR => (fetcher: Fetcher): Social => ({
  logIn: <T>(token: string): Promise<T> =>
    fetcher<T>({
      endpoint: `${endpoint}/log-in`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
  signUp: <T>(token: string): Promise<T> =>
    fetcher<T>({
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
