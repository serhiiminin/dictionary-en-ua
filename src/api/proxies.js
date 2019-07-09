import boom from '@hapi/boom';
import { joinUrl, mergeSearch, getUrlParts } from 'url-joiner';
import generatorApiKeys from '../util/generator-api-key';
import createFetcherJson from './fetcher';
import config from '../config';
import { addAuthTokenToRequest } from '../util/api';

const updateSearchParams = (params, newSearchParams) => {
  const [url, search] = getUrlParts(params.url);

  return {
    ...params,
    url: joinUrl(url, mergeSearch(newSearchParams, search)),
  };
};

const API_KEY = 'api_key';

const createApiKeyProxy = generator => fetcher => params =>
  fetcher(updateSearchParams(params, { [API_KEY]: generator.next().value })).catch(error => {
    if (error.message === 'Failed to fetch') {
      return fetcher(
        updateSearchParams(params, {
          [API_KEY]: generator.next().value,
        })
      );
    }
    throw boom.boomify(error);
  });

const apiKeyGiphyProxy = createApiKeyProxy(generatorApiKeys(config.auth.giphy.apiKeys))(
  createFetcherJson(window.fetch)
);

const createAuthProxy = fetcher => token => params => fetcher(addAuthTokenToRequest(token, params));

export { apiKeyGiphyProxy, createApiKeyProxy, createAuthProxy };
