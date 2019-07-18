import requests from './request';
import createFetcherJson from './fetcher';
import config from '../config';
import AR from './api-routes';
import { joinEndpoint, addAuthTokenToRequest } from '../util/api';
import { Fetcher, EndpointJoiner } from '../types';

interface Basic {
  logIn<T>(body: object): T;
  signUp<T>(body: object): T;
  confirm<T>(token: string): T;
  forgotPassword<T>(body: object): T;
  resetPassword<T>(body: object): T;
}

type BR = (f: Fetcher) => Basic;

const createApiBasicAuth = (endpointJoiner: EndpointJoiner): BR => (fetcher: Fetcher): Basic => ({
  logIn: <T>(body: object): T => fetcher(requests.post(endpointJoiner(AR.auth.basic.logIn), { body })),
  signUp: <T>(body: object): T => fetcher(requests.post(endpointJoiner(AR.auth.basic.signUp), { body })),
  confirm: <T>(token: string): T =>
    fetcher(requests.get(endpointJoiner(AR.auth.basic.confirm), addAuthTokenToRequest(token))),
  forgotPassword: <T>(body: object): T =>
    fetcher(requests.post(endpointJoiner(AR.auth.basic.forgotPassword), { body })),
  resetPassword: <T>(body: object): T => fetcher(requests.post(endpointJoiner(AR.auth.basic.resetPassword), { body })),
});

interface Social {
  logIn<T>(token: string): T;
  signUp<T>(token: string): T;
}

type SR = (f: Fetcher) => Social;

const createApiGoogleAuth = (endpointJoiner: EndpointJoiner): SR => (fetcher: Fetcher): Social => ({
  logIn: <T>(token: string): T =>
    fetcher(requests.get(endpointJoiner(AR.auth.google.logIn), addAuthTokenToRequest(token))),
  signUp: <T>(token: string): T =>
    fetcher(requests.get(endpointJoiner(AR.auth.google.signUp), addAuthTokenToRequest(token))),
});

const createApiFacebookAuth = (endpointJoiner: EndpointJoiner): SR => (fetcher: Fetcher): Social => ({
  logIn: <T>(token: string): T =>
    fetcher(requests.get(endpointJoiner(AR.auth.facebook.logIn), addAuthTokenToRequest(token))),
  signUp: <T>(token: string): T =>
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
