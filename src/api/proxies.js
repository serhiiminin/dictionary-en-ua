import { joinUrl, mergeSearch, getUrlParts } from 'url-joiner';
import generatorApiKeys from '../util/generator-api-key';
import createFetcherJson from './create-fetcher';
import config from '../config';
import { addAuthTokenToRequest } from '../util/api';

const updateSearchParams = (params, newSearchParams) => {
  const [url, search] = getUrlParts(params.endpoint);

  return {
    ...params,
    endpoint: joinUrl(url, mergeSearch(newSearchParams, search)),
  };
};

const createApiKeyProxy = generator => fetcher => params =>
  fetcher(updateSearchParams(params, { api_key: generator.next().value })).catch(error => {
    if (error.message === 'Failed to fetch') {
      return fetcher(
        updateSearchParams(params, {
          api_key: generator.next().value,
        })
      );
    }
    throw error;
  });

const apiKeyGiphyProxy = createApiKeyProxy(generatorApiKeys(config.auth.giphy.apiKeys))(
  createFetcherJson(window.fetch)
);

const createAuthProxy = fetcher => token => params => fetcher(addAuthTokenToRequest(token, params));

const createSocialAuthProxy = fetcher => (params, token) => fetcher(addAuthTokenToRequest(token, params));

export { apiKeyGiphyProxy, createApiKeyProxy, createAuthProxy, createSocialAuthProxy };
