import requests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import apiRoutes from './api-routes';
import { joinEndpoint } from '../util/api';

export const createApiUsers = endpointJoiner => fetcher => token => {
  const fetcherWithToken = fetcher(token);

  return {
    create: body => fetcherWithToken(requests.post(endpointJoiner(apiRoutes.users.create), { body })),
    get: id => fetcherWithToken(requests.get(endpointJoiner(generateRoute(apiRoutes.users.read, { id })))),
    update: data => {
      const { _id: id } = data;

      return fetcherWithToken(
        requests.put(endpointJoiner(generateRoute(apiRoutes.users.update, { id })), {
          body: data,
        })
      );
    },
    delete: id => fetcherWithToken(requests.delete(endpointJoiner(generateRoute(apiRoutes.users.delete, { id })))),
  };
};

const createApiMethodsUsers = createApiUsers(joinEndpoint(config.endpoints.api))(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsUsers;
