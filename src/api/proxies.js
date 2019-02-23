import { joinUrl } from 'url-joiner';
import generatorApiKeys from '../modules/generator-api-key';
import getGiphyApiKey from '../modules/get-api-keys';
import createFetcherJson from './create-fetcher';
import { getErrorType } from '../modules/handle-errors';

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

const API_KEY_PREFIX = 'REACT_APP_GIPHY_API_KEYS';
const GIPHY_API_KEYS = getGiphyApiKey(API_KEY_PREFIX)(process.env);
const apiKeyGiphyProxy = createApiKeyProxy(generatorApiKeys(GIPHY_API_KEYS))(
  createFetcherJson(window.fetch)
);

const createGoogleAuthProxy = fetcher => (params, token) =>
  fetcher({
    ...params,
    headers: {
      ...params.headers,
      authorization: `Bearer ${token}`,
    },
  }).catch(error => {
    throw new Error(getErrorType(error));
  });

export { apiKeyGiphyProxy, createApiKeyProxy, createGoogleAuthProxy };
