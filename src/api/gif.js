import { joinUrl, mergeSearch } from 'url-joiner';
import requests from './request';
import { apiKeyGiphyProxy } from './proxies';
import config from '../config';

export const createApiMethodsGifs = endpoint => fetcher => ({
  get: searchParams =>
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
