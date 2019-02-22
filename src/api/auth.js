import { joinUrl } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';

const { REACT_APP_ENDPOINT_AUTH } = process.env;

export const createApiMethodsAuth = endpoint => fetcher => ({
  logIn: body =>
    fetcher(
      requests.post(joinUrl({ url: endpoint, paths: ['login'] }), { body })
    ),
  signUp: body =>
    fetcher(
      requests.post(joinUrl({ url: endpoint, paths: ['signup'] }), { body })
    ),
});

const apiMethodsAuth = createApiMethodsAuth(REACT_APP_ENDPOINT_AUTH)(
  createFetcherJson(window.fetch)
);

export default apiMethodsAuth;
