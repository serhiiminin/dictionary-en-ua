import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';

const createApiMethodsBasicAuth = endpoint => fetcher => ({
  logIn: body => fetcher(requests.post(joinPath(endpoint, 'basic/log-in'), { body })),
  signUp: body => fetcher(requests.post(joinPath(endpoint, 'basic/sign-up'), { body })),
});

const createApiMethodsGoogleAuth = endpoint => fetcher => ({
  logIn: token => fetcher(requests.get(joinPath(endpoint, 'google/log-in')), token),
  signUp: token => fetcher(requests.get(joinPath(endpoint, 'google/sign-up')), token),
});

const createApiMethodsFacebookAuth = endpoint => fetcher => ({
  logIn: token => fetcher(requests.get(joinPath(endpoint, 'facebook/log-in')), token),
  signUp: token => fetcher(requests.get(joinPath(endpoint, 'facebook/sign-up')), token),
});

const apiMethodsBasicAuth = createApiMethodsBasicAuth(config.endpoints.auth)(createFetcherJson(window.fetch));
const apiMethodsGoogleAuth = createApiMethodsGoogleAuth(config.endpoints.auth)(
  createAuthProxy(createFetcherJson(window.fetch))
);
const apiMethodsFacebookAuth = createApiMethodsFacebookAuth(config.endpoints.auth)(
  createAuthProxy(createFetcherJson(window.fetch))
);

export {
  createApiMethodsBasicAuth,
  createApiMethodsGoogleAuth,
  createApiMethodsFacebookAuth,
  apiMethodsBasicAuth,
  apiMethodsGoogleAuth,
  apiMethodsFacebookAuth,
};
