import requests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import AR from './api-routes';
import { joinEndpoint } from '../util/api';
import { EndpointJoiner, FetcherWithToken, User } from '../types';

interface Users {
  create<T>(body: object): Promise<T>;
  get<T>(id: string): Promise<T>;
  update<T>(body: object): Promise<T>;
  delete<T>(id: string): Promise<T>;
}

type R = (t: string) => Users;
type UR = (f: FetcherWithToken) => R;

export const createApiUsers = (endpointJoiner: EndpointJoiner): UR => (fetcher: FetcherWithToken): R => (
  token: string
): Users => {
  const fetcherWithToken = fetcher(token);

  return {
    create: <T>(body: object): Promise<T> =>
      fetcherWithToken<T>(requests.post(endpointJoiner(AR.users.create), { body })),
    get: <T>(id: string): Promise<T> =>
      fetcherWithToken<T>(requests.get(endpointJoiner(generateRoute(AR.users.read, { id })))),
    update: <T>(data: User): Promise<T> => {
      const { _id: id } = data;

      return fetcherWithToken<T>(
        requests.put(endpointJoiner(generateRoute(AR.users.update, { id })), {
          body: data,
        })
      );
    },
    delete: <T>(id: string): Promise<T> =>
      fetcherWithToken<T>(requests.delete(endpointJoiner(generateRoute(AR.users.delete, { id })))),
  };
};

const createApiMethodsUsers = createApiUsers(joinEndpoint(config.endpoints.api))(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsUsers;
