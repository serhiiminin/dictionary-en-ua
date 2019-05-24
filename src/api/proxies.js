import { joinUrl, mergeSearch, getUrlParts } from 'url-joiner';
import generatorApiKeys from '../util/generator-api-key';
import createFetcherJson from './create-fetcher';
import config from '../config';

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

const createAuthProxy = token => fetcher => params =>
  fetcher({
    ...params,
    headers: {
      ...params.headers,
      authorization: `Bearer ${token}`,
    },
  });

const createSocialAuthProxy = fetcher => (params, token) =>
  fetcher({
    ...params,
    headers: {
      ...params.headers,
      authorization: `Bearer ${token}`,
    },
  });

export { apiKeyGiphyProxy, createApiKeyProxy, createAuthProxy, createSocialAuthProxy };
