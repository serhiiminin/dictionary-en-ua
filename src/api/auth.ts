import requests from './request';
import createFetcherJson from './fetcher';
import config from '../config';
import AR from './api-routes';
import { joinEndpoint, addAuthTokenToRequest } from '../util/api';
import { Fetcher, EndpointJoiner } from '../types';

interface Basic {
  logIn<T>(body: object): Promise<T>;
  signUp<T>(body: object): Promise<T>;
  confirm<T>(token: string): Promise<T>;
  forgotPassword<T>(body: object): Promise<T>;
  resetPassword<T>(body: object): Promise<T>;
}

type BR = (f: Fetcher) => Basic;

const { basic, facebook, google } = AR.auth;

const createApiBasicAuth = (endpointJoiner: EndpointJoiner): BR => (fetcher: Fetcher): Basic => ({
  logIn: <T>(body: object): Promise<T> => fetcher<T>(requests.post(endpointJoiner(basic.logIn), { body })),
  signUp: <T>(body: object): Promise<T> => fetcher<T>(requests.post(endpointJoiner(basic.signUp), { body })),
  confirm: <T>(token: string): Promise<T> =>
    fetcher<T>(requests.get(endpointJoiner(basic.confirm), addAuthTokenToRequest(token))),
  forgotPassword: <T>(body: object): Promise<T> =>
    fetcher<T>(requests.post(endpointJoiner(basic.forgotPassword), { body })),
  resetPassword: <T>(body: object): Promise<T> =>
    fetcher<T>(requests.post(endpointJoiner(basic.resetPassword), { body })),
});

interface Social {
  logIn<T>(token: string): Promise<T>;
  signUp<T>(token: string): Promise<T>;
}

type SR = (f: Fetcher) => Social;

const createApiGoogleAuth = (endpointJoiner: EndpointJoiner): SR => (fetcher: Fetcher): Social => ({
  logIn: <T>(token: string): Promise<T> =>
    fetcher<T>(requests.get(endpointJoiner(google.logIn), addAuthTokenToRequest(token))),
  signUp: <T>(token: string): Promise<T> =>
    fetcher<T>(requests.get(endpointJoiner(google.signUp), addAuthTokenToRequest(token))),
});

const createApiFacebookAuth = (endpointJoiner: EndpointJoiner): SR => (fetcher: Fetcher): Social => ({
  logIn: <T>(token: string): Promise<T> =>
    fetcher<T>(requests.get(endpointJoiner(facebook.logIn), addAuthTokenToRequest(token))),
  signUp: <T>(token: string): Promise<T> =>
    fetcher<T>(requests.get(endpointJoiner(facebook.signUp), addAuthTokenToRequest(token))),
});

const fetcherJson = createFetcherJson(window.fetch);
const apiMethodsBasicAuth = createApiBasicAuth(joinEndpoint(config.endpoints.api))(fetcherJson);
const apiMethodsGoogleAuth = createApiGoogleAuth(joinEndpoint(config.endpoints.api))(fetcherJson);
const apiMethodsFacebookAuth = createApiFacebookAuth(joinEndpoint(config.endpoints.api))(fetcherJson);

export {
  createApiBasicAuth,
  createApiGoogleAuth,
  createApiFacebookAuth,
  apiMethodsBasicAuth,
  apiMethodsGoogleAuth,
  apiMethodsFacebookAuth,
};
