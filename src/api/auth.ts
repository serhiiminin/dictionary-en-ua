import requests from './request';
import createFetcherJson from './fetcher';
import config from '../config';
import AR from './api-routes';
import { joinEndpoint, addAuthTokenToRequest } from '../util/api';
import { FetchResult, Fetcher, EndpointJoiner } from '../types';

interface Basic {
  logIn(body: object): FetchResult;
  signUp(body: object): FetchResult;
  confirm(token: string): FetchResult;
  forgotPassword(body: object): FetchResult;
  resetPassword(body: object): FetchResult;
}

type BR = (f: Fetcher) => Basic;

const createApiBasicAuth = (endpointJoiner: EndpointJoiner): BR => (fetcher: Fetcher): Basic => ({
  logIn: (body: object): FetchResult => fetcher(requests.post(endpointJoiner(AR.auth.basic.logIn), { body })),
  signUp: (body: object): FetchResult => fetcher(requests.post(endpointJoiner(AR.auth.basic.signUp), { body })),
  confirm: (token: string): FetchResult =>
    fetcher(requests.get(endpointJoiner(AR.auth.basic.confirm), addAuthTokenToRequest(token))),
  forgotPassword: (body: object): FetchResult =>
    fetcher(requests.post(endpointJoiner(AR.auth.basic.forgotPassword), { body })),
  resetPassword: (body: object): FetchResult =>
    fetcher(requests.post(endpointJoiner(AR.auth.basic.resetPassword), { body })),
});

interface Social {
  logIn(token: string): FetchResult;
  signUp(token: string): FetchResult;
}

type SR = (f: Fetcher) => Social;

const createApiGoogleAuth = (endpointJoiner: EndpointJoiner): SR => (fetcher: Fetcher): Social => ({
  logIn: (token: string): FetchResult =>
    fetcher(requests.get(endpointJoiner(AR.auth.google.logIn), addAuthTokenToRequest(token))),
  signUp: (token: string): FetchResult =>
    fetcher(requests.get(endpointJoiner(AR.auth.google.signUp), addAuthTokenToRequest(token))),
});

const createApiFacebookAuth = (endpointJoiner: EndpointJoiner): SR => (fetcher: Fetcher): Social => ({
  logIn: (token: string): FetchResult =>
    fetcher(requests.get(endpointJoiner(AR.auth.facebook.logIn), addAuthTokenToRequest(token))),
  signUp: (token: string): FetchResult =>
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
