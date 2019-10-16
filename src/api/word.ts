import createRequests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';
import { FetcherWithToken, Word } from '../types';

interface Words {
  create<T>(body: Word): Promise<T>;
  get<T>(id: string): Promise<T>;
  getList<T>(body: object): Promise<T>;
  getListToLearn<T>(params: object): Promise<T>;
  update<T>(word: T): Promise<T>;
  learn<T>(id: string): Promise<T>;
  delete<T>(id: string): Promise<T>;
  search<T>(params: object): Promise<T>;
}

type R = (t: string) => Words;
type WR = (f: FetcherWithToken) => R;

export const createApiWords = (endpoint: string): WR => (fetcher: FetcherWithToken): R => (token: string): Words => {
  const fetcherWithToken = fetcher(token);
  const requests = createRequests(endpoint, fetcherWithToken);

  return {
    ...requests,
    getListToLearn: <T>(params: object): Promise<T> => {
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);
      return requests.getList({
        timesLearnt: { $gte: 0, $lte: 5 },
        dateLastLearnt: { $gte: new Date(0), $lte: yesterday },
        ...params,
      });
    },
    learn: <T>(id: string): Promise<T> =>
      fetcherWithToken({
        endpoint: `${endpoint}/${id}/learn`,
        method: 'PUT',
        body: {
          dateLastLearnt: new Date().toISOString(),
          $inc: { timesLearnt: 1 },
        },
      }),
  };
};

const endpoint = `${config.endpoints.api}/words`;

const createApiMethodsWords = createApiWords(endpoint)(createAuthProxy(createFetcherJson(window.fetch)));

export default createApiMethodsWords;
