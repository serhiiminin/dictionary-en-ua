import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import apiRoutes from './api-routes';

export const createFetcherApiMethodsUsers = endpoint => fetcher => token => {
  const fetcherWithToken = fetcher(token);

  return {
    create: body => fetcherWithToken(requests.post(joinPath(endpoint, apiRoutes.users.create), { body })),
    get: id => fetcherWithToken(requests.get(joinPath(endpoint, generateRoute(apiRoutes.users.read, { id })))),
    update: data => {
      const { _id: id } = data;

      return fetcherWithToken(
        requests.put(joinPath(endpoint, generateRoute(apiRoutes.users.update, { id })), {
          body: data,
        })
      );
    },
    delete: id => fetcherWithToken(requests.delete(joinPath(endpoint, generateRoute(apiRoutes.users.delete, { id })))),
  };
};

const createApiMethodsUsers = createFetcherApiMethodsUsers(config.endpoints.api)(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsUsers;
