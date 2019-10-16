import createRequests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';
import { FetcherWithToken } from '../types';

interface Users {
  create<T>(body: object): Promise<T>;
  get<T>(id: string): Promise<T>;
  update<T>(body: T): Promise<T>;
  delete<T>(id: string): Promise<T>;
}

type R = (t: string) => Users;
type UR = (f: FetcherWithToken) => R;

export const createApiUsers = (endpoint: string): UR => (fetcher: FetcherWithToken): R => (token: string): Users => {
  const fetcherWithToken = fetcher(token);

  return createRequests(endpoint, fetcherWithToken);
};

const endpoint = `${config.endpoints.api}/users`;

const createApiMethodsUsers = createApiUsers(endpoint)(createAuthProxy(createFetcherJson(window.fetch)));

export default createApiMethodsUsers;
