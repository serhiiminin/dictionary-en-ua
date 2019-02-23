import { joinUrl } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';

const { REACT_APP_ENDPOINT_USERS } = process.env;

export const createApiMethodsUsers = endpoint => fetcher => ({
  create: (body, tokens) =>
    fetcher(
      requests.post(joinUrl({ url: endpoint, paths: ['new'] }), { body }),
      tokens
    ),
  get: (googleId, tokens) =>
    fetcher(
      requests.get(joinUrl({ url: endpoint, paths: [googleId] })),
      tokens
    ),
  update: (data, tokens) =>
    fetcher(
      requests.put(joinUrl({ url: endpoint, paths: [data._id] }), {
        body: data,
      }),
      tokens
    ),
  delete: (id, tokens) =>
    fetcher(requests.delete(joinUrl({ url: endpoint, paths: [id] })), tokens),
});

const apiMethodsUsers = createApiMethodsUsers(REACT_APP_ENDPOINT_USERS)(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default apiMethodsUsers;
