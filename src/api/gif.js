import { joinUrl } from 'url-joiner';
import requests from './request';
import { apiKeyGiphyProxy } from './proxies';

const { REACT_APP_ENDPOINT_GIPHY } = process.env;

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

const apiMethodsGifs = createApiMethodsGifs(REACT_APP_ENDPOINT_GIPHY)(
  apiKeyGiphyProxy
);

export default apiMethodsGifs;
