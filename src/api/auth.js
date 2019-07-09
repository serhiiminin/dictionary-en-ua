import requests from './request';
import createFetcherJson from './fetcher';
import config from '../config';
import { createSocialAuthProxy } from './proxies';
import AR from './api-routes';
import { generateEndpoint, addAuthTokenToRequest } from '../util/api';

const createApiMethodsBasicAuth = endpointJoiner => fetcher => ({
  logIn: body => fetcher(requests.post(endpointJoiner(AR.auth.basic.logIn), { body })),
  signUp: body => fetcher(requests.post(endpointJoiner(AR.auth.basic.signUp), { body })),
  confirm: token => fetcher(requests.get(endpointJoiner(AR.auth.basic.confirm), addAuthTokenToRequest(token))),
  forgotPassword: body => fetcher(requests.post(endpointJoiner(AR.auth.basic.forgotPassword), { body })),
  resetPassword: body => fetcher(requests.post(endpointJoiner(AR.auth.basic.resetPassword), { body })),
});

const createApiMethodsGoogleAuth = endpointJoiner => fetcher => ({
  logIn: token => fetcher(requests.get(endpointJoiner(AR.auth.google.logIn)), token),
  signUp: token => fetcher(requests.get(endpointJoiner(AR.auth.google.signUp)), token),
});

const createApiMethodsFacebookAuth = endpointJoiner => fetcher => ({
  logIn: token => fetcher(requests.get(endpointJoiner(AR.auth.facebook.logIn)), token),
  signUp: token => fetcher(requests.get(endpointJoiner(AR.auth.facebook.signUp)), token),
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
