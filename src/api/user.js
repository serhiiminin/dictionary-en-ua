import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import apiRoutes from './api-routes';

export const createApiMethodsUsers = endpoint => fetcher => ({
  create: (body, tokens) => fetcher(requests.post(joinPath(endpoint, apiRoutes.users.create), { body }), tokens),
  get: (id, tokens) => fetcher(requests.get(joinPath(endpoint, generateRoute(apiRoutes.users.read, { id }))), tokens),
  update: (data, tokens) => {
    const { _id: id } = data;

    return fetcher(
      requests.put(joinPath(endpoint, generateRoute(apiRoutes.users.update, { id })), {
        body: data,
      }),
      tokens
    );
  },
  delete: (id, tokens) =>
    fetcher(requests.delete(joinPath(endpoint, generateRoute(apiRoutes.users.delete, { id }))), tokens),
});

const apiMethodsUsers = createApiMethodsUsers(config.endpoints.api)(createAuthProxy(createFetcherJson(window.fetch)));

export default apiMethodsUsers;
