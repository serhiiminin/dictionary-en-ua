import urljoin from 'url-join';
import generatorApiKeys from '../helpers/generator-api-key';
import { mergeSearchParams } from '../helpers/search-params';
import { GIPHY_API_KEYS } from './credentials';
import { GIPHY } from './endpoints';
import { createFetcherJson } from './fetcher';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  error.response = response;
  throw error;
};

const parseJson = response => response.json();

const fetcher = createFetcherJson(window.fetch);

const fetchProxy = params => fetcher(params)
  .then(checkStatus)
  .then(parseJson)
  .catch(error => {
    if (error.message === 'Failed to fetch') {
      if (!window.navigator.onLine) {
        throw new Error('Check your internet connection');
      }
    }
    throw error;
  });

const createApiKeyProxy = apiKeys => {
  const genGiphyKey = generatorApiKeys(apiKeys);

  return (prepareRequest, params) => {
    const composeUrlWithNewKey = () => {
      const apiKey = genGiphyKey.next();

      if (apiKey.done) {
        throw new Error('Api key error');
      }
      return urljoin(GIPHY, `search?${mergeSearchParams({
        api_key: apiKey.value,
        limit: 100,
        ...params
      })}`);
    };

    return fetchProxy(prepareRequest(composeUrlWithNewKey()))
      .catch(error => {
        if (error.message === 'Failed to fetch') {
          return fetchProxy(prepareRequest(composeUrlWithNewKey()));
        }
        return error;
      });
  };
};

const apiKeyGiphyProxy = createApiKeyProxy(GIPHY_API_KEYS);

export { fetchProxy, apiKeyGiphyProxy };
