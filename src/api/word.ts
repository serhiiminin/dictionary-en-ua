import requests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import AR from './api-routes';
import { joinEndpoint } from '../util/api';
import { EndpointJoiner, FetcherWithToken, FetchResult, Word } from '../types';

interface Words {
  create(body: Word): FetchResult;
  get(id: string): FetchResult;
  getList(body: object): FetchResult;
  getListToLearn(params: object): FetchResult;
  update(word: Word): FetchResult;
  learn(id: string): FetchResult;
  delete(id: string): FetchResult;
  search(params: object): FetchResult;
}

type R = (t: string) => Words;
type WR = (f: FetcherWithToken) => R;

export const createApiWords = (endpointJoiner: EndpointJoiner): WR => (fetcher: FetcherWithToken): R => (
  token: string
): Words => {
  const fetcherWithToken = fetcher(token);

  return {
    create: (body: Word): FetchResult => fetcherWithToken(requests.post(endpointJoiner(AR.words.create), { body })),
    get: (id: string): FetchResult =>
      fetcherWithToken(requests.get(endpointJoiner(generateRoute(AR.words.read, { id })))),
    getList: (body: object): FetchResult => fetcherWithToken(requests.post(endpointJoiner(AR.words.list), { body })),
    getListToLearn: (params: object): FetchResult => {
      const url = endpointJoiner(AR.words.list);
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);
      return fetcherWithToken(
        requests.post(url, {
          body: {
            timesLearnt: { $gte: 0, $lte: 5 },
            dateLastLearnt: { $gte: new Date(0), $lte: yesterday },
            ...params,
          },
        })
      );
    },
    update: (word: Word): FetchResult => {
      const { _id: id } = word;
      return fetcherWithToken(
        requests.put(endpointJoiner(generateRoute(AR.words.update, { id })), {
          body: word,
        })
      );
    },
    delete: (id: string): FetchResult =>
      fetcherWithToken(requests.delete(endpointJoiner(generateRoute(AR.words.delete, { id })))),
    learn: (id: string): FetchResult =>
      fetcherWithToken(
        requests.put(endpointJoiner(generateRoute(AR.words.learn, { id })), {
          body: {
            dateLastLearnt: new Date().toISOString(),
            $inc: { timesLearnt: 1 },
          },
        })
      ),
    search: (body: object): FetchResult => fetcherWithToken(requests.post(endpointJoiner(AR.words.search), { body })),
  };
};

const createApiMethodsWords = createApiWords(joinEndpoint(config.endpoints.api))(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsWords;
