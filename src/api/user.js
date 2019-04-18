import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';

export const createApiMethodsUsers = endpoint => fetcher => ({
  create: (body, tokens) => fetcher(requests.post(joinPath(endpoint, 'new'), { body }), tokens),
  get: (googleId, tokens) => fetcher(requests.get(joinPath(endpoint, googleId)), tokens),
  update: (data, tokens) => {
    const { _id: id } = data;

    return fetcher(
      requests.put(joinPath(endpoint, id), {
        body: data,
      }),
      tokens
    );
  },
  delete: (id, tokens) => fetcher(requests.delete(joinPath(endpoint, id)), tokens),
});

const apiMethodsUsers = createApiMethodsUsers(config.endpoints.api)(createAuthProxy(createFetcherJson(window.fetch)));

export default apiMethodsUsers;
