import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import apiRoutes from './api-routes';

export const createFetcherApiMethodsWords = endpoint => fetcher => token => {
  const fetcherWithToken = fetcher(token);

  return {
    create: body => fetcherWithToken(requests.post(joinPath(endpoint, apiRoutes.words.create), { body })),
    get: id => fetcherWithToken(requests.get(joinPath(endpoint, generateRoute(apiRoutes.words.read, { id })))),
    getList: body => fetcherWithToken(requests.post(joinPath(endpoint, apiRoutes.words.list), { body })),
    getListToLearn: params => {
      const url = joinPath(endpoint, apiRoutes.words.list);
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
    update: word => {
      const { _id: id } = word;
      return fetcherWithToken(
        requests.put(joinPath(endpoint, generateRoute(apiRoutes.words.update, { id })), {
          body: word,
        })
      );
    },
    delete: id =>
      fetcherWithToken(requests.delete(joinPath(endpoint, generateRoute(apiRoutes.words.delete, { id }))), token),
    learn: id =>
      fetcherWithToken(
        requests.put(joinPath(endpoint, generateRoute(apiRoutes.words.learn, { id })), {
          body: {
            dateLastLearnt: new Date().toISOString(),
            $inc: { timesLearnt: 1 },
          },
        })
      ),
    search: params =>
      fetcherWithToken(
        requests.post(joinPath(endpoint, apiRoutes.words.search), {
          body: params,
        })
      ),
  };
};

const createApiMethodsWords = createFetcherApiMethodsWords(config.endpoints.api)(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsWords;
