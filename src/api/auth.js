import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import config from '../config';
import { createSocialAuthProxy } from './proxies';
import apiRoutes from './api-routes';

const createApiMethodsBasicAuth = endpoint => fetcher => ({
  logIn: body => fetcher(requests.post(joinPath(endpoint, apiRoutes.auth.basic.logIn), { body })),
  signUp: body => fetcher(requests.post(joinPath(endpoint, apiRoutes.auth.basic.signUp), { body })),
  forgotPassword: body => fetcher(requests.post(joinPath(endpoint, apiRoutes.auth.basic.forgotPassword), { body })),
});

const createApiMethodsGoogleAuth = endpoint => fetcher => ({
  logIn: token => fetcher(requests.get(joinPath(endpoint, apiRoutes.auth.google.logIn)), token),
  signUp: token => fetcher(requests.get(joinPath(endpoint, apiRoutes.auth.google.signUp)), token),
});

const createApiMethodsFacebookAuth = endpoint => fetcher => ({
  logIn: token => fetcher(requests.get(joinPath(endpoint, apiRoutes.auth.facebook.logIn)), token),
  signUp: token => fetcher(requests.get(joinPath(endpoint, apiRoutes.auth.facebook.signUp)), token),
});

const apiMethodsBasicAuth = createApiMethodsBasicAuth(config.endpoints.api)(createFetcherJson(window.fetch));
const apiMethodsGoogleAuth = createApiMethodsGoogleAuth(config.endpoints.api)(
  createSocialAuthProxy(createFetcherJson(window.fetch))
);
const apiMethodsFacebookAuth = createApiMethodsFacebookAuth(config.endpoints.api)(
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
