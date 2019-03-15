import { joinUrl } from 'url-joiner';
import generatorApiKeys from '../modules/generator-api-key';
import createFetcherJson from './create-fetcher';
import { getErrorType } from '../modules/handle-errors';
import config from '../config';

const updateSearchParams = (params, newSearchParams) => ({
  ...params,
  endpoint: joinUrl({ url: params.endpoint, searchParams: newSearchParams }),
});

const createApiKeyProxy = generator => fetcher => params =>
  fetcher(
    updateSearchParams(params, { api_key: generator.next().value })
  ).catch(error => {
    if (error.message === 'Failed to fetch') {
      return fetcher(
        updateSearchParams(params, {
          api_key: generator.next().value,
        })
      );
    }
    throw error;
  });

const apiKeyGiphyProxy = createApiKeyProxy(
  generatorApiKeys(config.auth.giphy.apiKeys)
)(createFetcherJson(window.fetch));

const createAuthProxy = fetcher => (params, token) =>
  fetcher({
    ...params,
    headers: {
      ...params.headers,
      authorization: `Bearer ${token}`,
    },
  }).catch(error => {
    throw new Error(getErrorType(error));
  });

export { apiKeyGiphyProxy, createApiKeyProxy, createAuthProxy };
