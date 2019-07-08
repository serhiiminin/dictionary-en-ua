import requests from './request';
import createFetcherJson from './fetcher';
import config from '../config';
import { createSocialAuthProxy } from './proxies';
import AR from './api-routes';
import { generateEndpoint, addAuthTokenToRequest } from '../util/api';

type F = (request: object) => Promise<object>;
type EJ = (path: string) => string;
type B = (fetcher: F) => Basic;

interface Basic {
  logIn: (b: object) => object;
  signUp: (b: object) => object;
  confirm: (t: string) => object;
  forgotPassword: (b: object) => object;
  resetPassword: (b: object) => object;
}

const createApiMethodsBasicAuth = (endpointJoiner: EJ): B => (fetcher: F): Basic => ({
  logIn: (body: object): object => fetcher(requests.post(endpointJoiner(AR.auth.basic.logIn), { body })),
  signUp: (body: object): object => fetcher(requests.post(endpointJoiner(AR.auth.basic.signUp), { body })),
  confirm: (token: string): object =>
    fetcher(requests.get(endpointJoiner(AR.auth.basic.confirm), addAuthTokenToRequest(token))),
  forgotPassword: (body: object): object =>
    fetcher(requests.post(endpointJoiner(AR.auth.basic.forgotPassword), { body })),
  resetPassword: (body: object): object =>
    fetcher(requests.post(endpointJoiner(AR.auth.basic.resetPassword), { body })),
});

interface Google {
  logIn: (t: string) => object;
  signUp: (t: string) => object;
}

type SF = (params: object, token: string) => Promise<object>;
type G = (fetcher: SF) => Google;

const createApiMethodsGoogleAuth = (endpointJoiner: EJ): G => (fetcher: SF): Google => ({
  logIn: (token: string): object => fetcher(requests.get(endpointJoiner(AR.auth.google.logIn)), token),
  signUp: (token: string): object => fetcher(requests.get(endpointJoiner(AR.auth.google.signUp)), token),
});

interface Facebook {
  logIn: (t: string) => object;
  signUp: (t: string) => object;
}

type FB = (fetcher: SF) => Google;

const createApiMethodsFacebookAuth = (endpointJoiner: EJ): FB => (fetcher: SF): Facebook => ({
  logIn: (token: string): object => fetcher(requests.get(endpointJoiner(AR.auth.facebook.logIn)), token),
  signUp: (token: string): object => fetcher(requests.get(endpointJoiner(AR.auth.facebook.signUp)), token),
});

const apiMethodsBasicAuth = createApiMethodsBasicAuth(generateEndpoint(config.endpoints.api))(
  createFetcherJson(window.fetch)
);
const apiMethodsGoogleAuth = createApiMethodsGoogleAuth(generateEndpoint(config.endpoints.api))(
  createSocialAuthProxy(createFetcherJson(window.fetch))
);
const apiMethodsFacebookAuth = createApiMethodsFacebookAuth(generateEndpoint(config.endpoints.api))(
  createSocialAuthProxy(createFetcherJson(window.fetch))
);

export {
  createApiMethodsBasicAuth,
  createApiMethodsGoogleAuth,
  createApiMethodsFacebookAuth,
  apiMethodsBasicAuth,
  apiMethodsGoogleAuth,
  apiMethodsFacebookAuth,
};
