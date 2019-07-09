import requests from './request';
import createFetcherJson from './fetcher';
import config from '../config';
import AR from './api-routes';
import { joinEndpoint, addAuthTokenToRequest } from '../util/api';

interface RequestParams {
  url: string;
  headers: object;
  body: object;
}
type R = Promise<object>;
type EJ = (path: string) => string;
type F = (params: RequestParams) => R;

interface Basic {
  logIn(body: object): R;
  signUp(body: object): R;
  confirm(token: string): R;
  forgotPassword(body: object): R;
  resetPassword(body: object): R;
}

type BR = (f: F) => Basic;

const createApiBasicAuth = (endpointJoiner: EJ): BR => (fetcher: F): Basic => ({
  logIn: (body: object): R => fetcher(requests.post(endpointJoiner(AR.auth.basic.logIn), { body })),
  signUp: (body: object): R => fetcher(requests.post(endpointJoiner(AR.auth.basic.signUp), { body })),
  confirm: (token: string): R =>
    fetcher(requests.get(endpointJoiner(AR.auth.basic.confirm), addAuthTokenToRequest(token))),
  forgotPassword: (body: object): R => fetcher(requests.post(endpointJoiner(AR.auth.basic.forgotPassword), { body })),
  resetPassword: (body: object): R => fetcher(requests.post(endpointJoiner(AR.auth.basic.resetPassword), { body })),
});

interface Social {
  logIn(token: string): R;
  signUp(token: string): R;
}

type SR = (f: F) => Social;

const createApiGoogleAuth = (endpointJoiner: EJ): SR => (fetcher: F): Social => ({
  logIn: (token: string): R =>
    fetcher(requests.get(endpointJoiner(AR.auth.google.logIn), addAuthTokenToRequest(token))),
  signUp: (token: string): R =>
    fetcher(requests.get(endpointJoiner(AR.auth.google.signUp), addAuthTokenToRequest(token))),
});

const createApiFacebookAuth = (endpointJoiner: EJ): SR => (fetcher: F): Social => ({
  logIn: (token: string): R =>
    fetcher(requests.get(endpointJoiner(AR.auth.facebook.logIn), addAuthTokenToRequest(token))),
  signUp: (token: string): R =>
    fetcher(requests.get(endpointJoiner(AR.auth.facebook.signUp), addAuthTokenToRequest(token))),
});

const apiMethodsBasicAuth = createApiBasicAuth(joinEndpoint(config.endpoints.api))(createFetcherJson(window.fetch));
const apiMethodsGoogleAuth = createApiGoogleAuth(joinEndpoint(config.endpoints.api))(createFetcherJson(window.fetch));
const apiMethodsFacebookAuth = createApiFacebookAuth(joinEndpoint(config.endpoints.api))(
  createFetcherJson(window.fetch)
);

export {
  createApiBasicAuth,
  createApiGoogleAuth,
  createApiFacebookAuth,
  apiMethodsBasicAuth,
  apiMethodsGoogleAuth,
  apiMethodsFacebookAuth,
};
