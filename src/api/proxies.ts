import boom from '@hapi/boom';
import { joinUrl, mergeSearch, getUrlParts } from 'url-joiner';
import generatorApiKeys from '../util/generator-api-key';
import createFetcherJson from './fetcher';
import config from '../config';
import { Fetcher, RequestParams } from '../types';

const API_KEY = 'api_key';

interface Params {
  [API_KEY]: string;
}

const updateSearchParams = (params: RequestParams, newSearchParams: Params): RequestParams => {
  const [url, search] = getUrlParts(params.endpoint || '');

  return {
    ...params,
    endpoint: joinUrl(url, mergeSearch(newSearchParams, search)),
  };
};

type R = <T>(params: RequestParams) => Promise<T>;
type PR = (fetcher: Fetcher) => R;

const createApiKeyProxy = (generator: IterableIterator<string>): PR => (fetcher: Fetcher): R => <T>(
  params: RequestParams
): Promise<T> =>
  fetcher<T>(updateSearchParams(params, { [API_KEY]: generator.next().value })).catch(
    (error: Error): Promise<T> => {
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

const createAuthProxy = (fetcher: Fetcher): TR => (token: string): R => <T>(params: RequestParams): Promise<T> =>
  fetcher({
    ...params,
    headers: { ...params.headers, authorization: `Bearer ${token}` },
  });

export { apiKeyGiphyProxy, createApiKeyProxy, createAuthProxy };
