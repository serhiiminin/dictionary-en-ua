import { joinUrl } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import config from '../config';

export const createApiMethodsAuth = endpoint => fetcher => ({
  logIn: body => fetcher(requests.post(joinUrl({ url: endpoint, paths: ['basic', 'log-in'] }), { body })),
  signUp: body => fetcher(requests.post(joinUrl({ url: endpoint, paths: ['basic', 'sign-up'] }), { body })),
});

const apiMethodsAuth = createApiMethodsAuth(config.endpoints.auth)(createFetcherJson(window.fetch));

export default apiMethodsAuth;
