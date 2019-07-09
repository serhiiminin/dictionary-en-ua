import { joinUrl, mergeSearch } from 'url-joiner';
import requests from './request';
import { apiKeyGiphyProxy } from './proxies';
import config from '../config';
import { FetchResult, Fetcher } from '../types';

interface Gif {
  get(body: object): FetchResult;
}
type R = (f: Fetcher) => Gif;

export const createApiMethodsGifs = (endpoint: string): R => (fetcher: Fetcher): Gif => ({
  get: (searchParams: object): FetchResult =>
    fetcher(
      requests.get(
        joinUrl(
          endpoint,
          mergeSearch({
            limit: 100,
            ...searchParams,
          })
        )
      )
    ),
});

const apiMethodsGifs = createApiMethodsGifs(config.endpoints.giphy)(apiKeyGiphyProxy);

export default apiMethodsGifs;
