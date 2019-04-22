import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import apiRoutes from './api-routes';

export const createApiMethodsWords = endpoint => fetcher => ({
  create: (body, token) => fetcher(requests.post(joinPath(endpoint, apiRoutes.words.create), { body }), token),
  get: (id, token) => fetcher(requests.get(joinPath(endpoint, generateRoute(apiRoutes.words.read, { id }))), token),
  getList: (body, token) => fetcher(requests.post(joinPath(endpoint, apiRoutes.words.list), { body }), token),
  getListToLearn: (params, token) => {
    const url = joinPath(endpoint, apiRoutes.words.list);
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
      requests.put(joinPath(endpoint, generateRoute(apiRoutes.words.update, { id })), {
        body: word,
      }),
      token
    );
  },
  delete: (id, token) =>
    fetcher(requests.delete(joinPath(endpoint, generateRoute(apiRoutes.words.delete, { id }))), token),
  learn: (id, token) =>
    fetcher(
      requests.put(joinPath(endpoint, generateRoute(apiRoutes.words.learn, { id })), {
        body: {
          dateLastLearnt: new Date().toISOString(),
          $inc: { timesLearnt: 1 },
        },
      }),
      token
    ),
  search: (params, token) =>
    fetcher(
      requests.post(joinPath(endpoint, apiRoutes.words.search), {
        body: params,
      }),
      token
    ),
});

const apiMethodsWords = createApiMethodsWords(config.endpoints.api)(createAuthProxy(createFetcherJson(window.fetch)));

export default apiMethodsWords;
