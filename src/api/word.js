import { joinUrl } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';

export const createApiMethodsWords = endpoint => fetcher => ({
  create: (body, token) => fetcher(requests.post(endpoint, { body }), token),
  get: (id, token) => fetcher(requests.get(joinUrl({ url: endpoint, paths: [id] })), token),
  getList: (body, token) => fetcher(requests.post(joinUrl({ url: endpoint, paths: ['list'] }), { body }), token),
  getListToLearn: (params, token) => {
    const url = joinUrl({ url: endpoint, paths: ['list'] });
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
      requests.put(joinUrl({ url: endpoint, paths: [id] }), {
        body: word,
      }),
      token
    );
  },
  delete: (wordId, token) => fetcher(requests.delete(joinUrl({ url: endpoint, paths: [wordId] })), token),
  learn: (wordId, token) =>
    fetcher(
      requests.put(joinUrl({ url: endpoint, paths: [wordId] }), {
        body: {
          dateLastLearnt: new Date(Date.now()).toISOString(),
          $inc: { timesLearnt: 1 },
        },
      }),
      token
    ),
  search: (params, token) =>
    fetcher(
      requests.post(joinUrl({ url: endpoint, paths: ['search-new'] }), {
        body: params,
      }),
      token
    ),
});

const apiMethodsWords = createApiMethodsWords(config.endpoints.words)(createAuthProxy(createFetcherJson(window.fetch)));

export default apiMethodsWords;
