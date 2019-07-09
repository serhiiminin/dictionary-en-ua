import requests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import apiRoutes from './api-routes';
import { joinEndpoint } from '../util/api';
import { EndpointJoiner, FetcherWithToken, FetchResult, User } from '../types';

interface Users {
  create(body: object): FetchResult;
  get(id: string): FetchResult;
  update(body: object): FetchResult;
  delete(id: string): FetchResult;
}

type R = (t: string) => Users;
type UR = (f: FetcherWithToken) => R;

export const createApiUsers = (endpointJoiner: EndpointJoiner): UR => (fetcher: FetcherWithToken): R => (
  token: string
): Users => {
  const fetcherWithToken = fetcher(token);

  return {
    create: (body: object): FetchResult =>
      fetcherWithToken(requests.post(endpointJoiner(apiRoutes.users.create), { body })),
    get: (id: string): FetchResult =>
      fetcherWithToken(requests.get(endpointJoiner(generateRoute(apiRoutes.users.read, { id })))),
    update: (data: User): FetchResult => {
      const { _id: id } = data;

      return fetcherWithToken(
        requests.put(endpointJoiner(generateRoute(apiRoutes.users.update, { id })), {
          body: data,
        })
      );
    },
    delete: (id: string): FetchResult =>
      fetcherWithToken(requests.delete(endpointJoiner(generateRoute(apiRoutes.users.delete, { id })))),
  };
};

const createApiMethodsUsers = createApiUsers(joinEndpoint(config.endpoints.api))(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsUsers;
