import { joinUrl, mergeSearch } from 'url-joiner';
import requests from './request';
import { apiKeyGiphyProxy } from './proxies';
import config from '../config';
import { Fetcher } from '../types';

interface Gif {
  get<T>(body: object): Promise<T>;
}
type R = (f: Fetcher) => Gif;

export const createApiMethodsGifs = (endpoint: string): R => (fetcher: Fetcher): Gif => ({
  get: <T>(searchParams: object): Promise<T> =>
    fetcher<T>(
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
