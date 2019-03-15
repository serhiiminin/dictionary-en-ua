import { joinUrl } from 'url-joiner';
import requests from './request';
import { apiKeyGiphyProxy } from './proxies';
import config from '../config';

export const createApiMethodsGifs = endpoint => fetcher => ({
  get: searchParams =>
    fetcher(
      requests.get(
        joinUrl({
          url: endpoint,
          searchParams: {
            limit: 100,
            ...searchParams,
          },
        })
      )
    ),
});

const apiMethodsGifs = createApiMethodsGifs(config.endpoints.giphy)(
  apiKeyGiphyProxy
);

export default apiMethodsGifs;
