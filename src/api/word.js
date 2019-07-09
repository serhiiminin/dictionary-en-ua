import requests from './request';
import createFetcherJson from './fetcher';
import { createAuthProxy } from './proxies';
import generateRoute from '../util/routes';
import config from '../config';
import AR from './api-routes';
import { joinEndpoint } from '../util/api';

export const createApiWords = endpointJoiner => fetcher => token => {
  const fetcherWithToken = fetcher(token);

  return {
    create: body => fetcherWithToken(requests.post(endpointJoiner(AR.words.create), { body })),
    get: id => fetcherWithToken(requests.get(endpointJoiner(generateRoute(AR.words.read, { id })))),
    getList: body => fetcherWithToken(requests.post(endpointJoiner(endpointJoiner, AR.words.list), { body })),
    getListToLearn: params => {
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
    update: word => {
      const { _id: id } = word;
      return fetcherWithToken(
        requests.put(endpointJoiner(generateRoute(AR.words.update, { id })), {
          body: word,
        })
      );
    },
    delete: id => fetcherWithToken(requests.delete(endpointJoiner(generateRoute(AR.words.delete, { id })))),
    learn: id =>
      fetcherWithToken(
        requests.put(endpointJoiner(generateRoute(AR.words.learn, { id })), {
          body: {
            dateLastLearnt: new Date().toISOString(),
            $inc: { timesLearnt: 1 },
          },
        })
      ),
    search: body => fetcherWithToken(requests.post(endpointJoiner(AR.words.search), { body })),
  };
};

const createApiMethodsWords = createApiWords(joinEndpoint(config.endpoints.api))(
  createAuthProxy(createFetcherJson(window.fetch))
);

export default createApiMethodsWords;
