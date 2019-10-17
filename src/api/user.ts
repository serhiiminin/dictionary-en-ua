import createRequests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';
import { FetcherWithToken, User } from '../types';

interface Users {
  create(body: User): Promise<User>;
  get(id: string): Promise<User>;
  update(body: User): Promise<User>;
  delete(id: string): Promise<void>;
}

type R = (t: string) => Users;
type UR = (f: FetcherWithToken) => R;

export const createApiUsers = (endpoint: string): UR => (fetcher: FetcherWithToken): R => (token: string): Users => {
  const fetcherWithToken = fetcher(token);
  const requests = createRequests(endpoint, fetcherWithToken);

  return {
    create: (body: User): Promise<User> => requests.create<User>(body),
    get: (id: string): Promise<User> => requests.get<User>(id),
    update: (body: User): Promise<User> => requests.update(body),
    delete: (id: string): Promise<void> => requests.delete(id),
  };
};

const endpoint = `${config.endpoints.api}/users`;

const createApiMethodsUsers = createApiUsers(endpoint)(createAuthProxy(createFetcherJson(window.fetch)));

export default createApiMethodsUsers;
