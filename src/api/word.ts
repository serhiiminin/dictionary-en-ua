import createRequests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';
import { FetcherWithToken, Word } from '../types';

interface List {
  items: Word[];
  count: number;
}

interface Words {
  create(body: Word): Promise<Word>;
  get(id: string): Promise<Word>;
  getList(body: object): Promise<List>;
  getListToLearn(params: object): Promise<List>;
  update(word: Word): Promise<Word>;
  learn(id: string): Promise<Word>;
  delete(id: string): Promise<void>;
  search(params: object): Promise<Word>;
}

type R = (t: string) => Words;
type WR = (f: FetcherWithToken) => R;

export const createApiWords = (endpoint: string): WR => (fetcher: FetcherWithToken): R => (token: string): Words => {
  const fetcherWithToken = fetcher(token);
  const requests = createRequests(endpoint, fetcherWithToken);

  return {
    create: (body: Word): Promise<Word> => requests.create<Word>(body),
    get: (id: string): Promise<Word> => requests.get<Word>(id),
    getList: (body: object): Promise<List> => requests.getList<List>(body),
    update: (body: Word): Promise<Word> => requests.update<Word>(body),
    delete: (id: string): Promise<void> => requests.delete<void>(id),
    search: (params: object): Promise<Word> => requests.search<Word>(params),
    getListToLearn: (params: object): Promise<{ items: Word[]; count: number }> => {
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);
      return requests.getList({
        timesLearnt: { $gte: 0, $lte: 5 },
        dateLastLearnt: { $gte: new Date(0), $lte: yesterday },
        ...params,
      });
    },
    learn: (id: string): Promise<Word> =>
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

const createApiMethodsWords = createApiWords(config.endpoints.api.words)(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsWords;
