import requests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import AR from './api-routes';
import { joinEndpoint } from '../util/api';
import { EndpointJoiner, FetcherWithToken, Word } from '../types';

interface Words {
  create<T>(body: Word): Promise<T>;
  get<T>(id: string): Promise<T>;
  getList<T>(body: object): Promise<T>;
  getListToLearn<T>(params: object): Promise<T>;
  update<T>(word: Word): Promise<T>;
  learn<T>(id: string): Promise<T>;
  delete<T>(id: string): Promise<T>;
  search<T>(params: object): Promise<T>;
}

type R = (t: string) => Words;
type WR = (f: FetcherWithToken) => R;

export const createApiWords = (endpointJoiner: EndpointJoiner): WR => (fetcher: FetcherWithToken): R => (
  token: string
): Words => {
  const fetcherWithToken = fetcher(token);

  return {
    create: <T>(body: Word): Promise<T> =>
      fetcherWithToken<T>(requests.post(endpointJoiner(AR.words.create), { body })),
    get: <T>(id: string): Promise<T> =>
      fetcherWithToken<T>(requests.get(endpointJoiner(generateRoute(AR.words.read, { id })))),
    getList: <T>(body: object): Promise<T> =>
      fetcherWithToken<T>(requests.post(endpointJoiner(AR.words.list), { body })),
    getListToLearn: <T>(params: object): Promise<T> => {
      const url = endpointJoiner(AR.words.list);
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);
      return fetcherWithToken<T>(
        requests.post(url, {
          body: {
            timesLearnt: { $gte: 0, $lte: 5 },
            dateLastLearnt: { $gte: new Date(0), $lte: yesterday },
            ...params,
          },
        })
      );
    },
    update: <T>(word: Word): Promise<T> => {
      const { _id: id } = word;
      return fetcherWithToken<T>(
        requests.put(endpointJoiner(generateRoute(AR.words.update, { id })), {
          body: word,
        })
      );
    },
    delete: <T>(id: string): Promise<T> =>
      fetcherWithToken<T>(requests.delete(endpointJoiner(generateRoute(AR.words.delete, { id })))),
    learn: <T>(id: string): Promise<T> =>
      fetcherWithToken<T>(
        requests.put(endpointJoiner(generateRoute(AR.words.learn, { id })), {
          body: {
            dateLastLearnt: new Date().toISOString(),
            $inc: { timesLearnt: 1 },
          },
        })
      ),
    search: <T>(body: object): Promise<T> =>
      fetcherWithToken<T>(requests.post(endpointJoiner(AR.words.search), { body })),
  };
};

const createApiMethodsWords = createApiWords(joinEndpoint(config.endpoints.api))(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsWords;
