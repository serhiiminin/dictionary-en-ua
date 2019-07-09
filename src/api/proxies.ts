import boom from '@hapi/boom';
import { joinUrl, mergeSearch, getUrlParts } from 'url-joiner';
import generatorApiKeys from '../util/generator-api-key';
import createFetcherJson from './fetcher';
import config from '../config';
import { addAuthTokenToRequest } from '../util/api';
import { Fetcher, FetchResult, RequestParams } from '../types';

const API_KEY = 'api_key';

interface NewParams {
  [API_KEY]: string;
}

const updateSearchParams = (params: RequestParams, newSearchParams: NewParams): RequestParams => {
  const [url, search] = getUrlParts(params.url || '');

  return {
    ...params,
    url: joinUrl(url, mergeSearch(newSearchParams, search)),
  };
};

type R = (params: RequestParams) => FetchResult;
type PR = (fetcher: Fetcher) => R;

const createApiKeyProxy = (generator: IterableIterator<string>): PR => (fetcher: Fetcher): R => (
  params: RequestParams
): FetchResult =>
  fetcher(updateSearchParams(params, { [API_KEY]: generator.next().value })).catch(
    (error: Error): FetchResult => {
      if (error.message === 'Failed to fetch') {
        return fetcher(
          updateSearchParams(params, {
            [API_KEY]: generator.next().value,
          })
        );
      }
      throw boom.boomify(error);
    }
  );

const apiKeyGiphyProxy = createApiKeyProxy(generatorApiKeys(config.auth.giphy.apiKeys))(
  createFetcherJson(window.fetch)
);

type TR = (token: string) => R;

const createAuthProxy = (fetcher: Fetcher): TR => (token: string): R => (params: RequestParams): FetchResult =>
  fetcher(addAuthTokenToRequest(token, params));

export { apiKeyGiphyProxy, createApiKeyProxy, createAuthProxy };
