import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';

export const createApiMethodsWords = endpoint => fetcher => ({
  create: (body, token) => fetcher(requests.post(joinPath(endpoint, 'words'), { body }), token),
  get: (id, token) => fetcher(requests.get(joinPath(endpoint, `words/${id}`)), token),
  getList: (body, token) => fetcher(requests.post(joinPath(endpoint, 'words/list'), { body }), token),
  getListToLearn: (params, token) => {
    const url = joinPath(endpoint, 'words/list');
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
    return fetcher(
      requests.post(url, {
        body: {
          timesLearnt: { $gte: 0, $lte: 5 },
          dateLastLearnt: { $gte: new Date(0), $lte: yesterday },
          ...params,
        },
      }),
      token
    );
  },
  update: (word, token) => {
    const { _id: id } = word;
    return fetcher(
      requests.put(joinPath(endpoint, `words/${id}`), {
        body: word,
      }),
      token
    );
  },
  delete: (wordId, token) => fetcher(requests.delete(joinPath(endpoint, `words/${wordId}`)), token),
  learn: (wordId, token) =>
    fetcher(
      requests.put(joinPath(endpoint, wordId), {
        body: {
          dateLastLearnt: new Date().toISOString(),
          $inc: { timesLearnt: 1 },
        },
      }),
      token
    ),
  search: (params, token) =>
    fetcher(
      requests.post(joinPath(endpoint, 'words/search'), {
        body: params,
      }),
      token
    ),
});

const apiMethodsWords = createApiMethodsWords(config.endpoints.api)(createAuthProxy(createFetcherJson(window.fetch)));

export default apiMethodsWords;
