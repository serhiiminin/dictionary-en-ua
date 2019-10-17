import { joinUrl, mergeSearch } from 'url-joiner';
import { apiKeyGiphyProxy } from './proxies';
import config from '../config';
import { Fetcher, Gif } from '../types';

interface Response {
  data: Gif[];
}

interface GifI {
  get(body: object): Promise<Response>;
}
type R = (f: Fetcher) => GifI;

export const createApiMethodsGifs = (endpoint: string): R => (fetcher: Fetcher): GifI => ({
  get: (searchParams: object): Promise<Response> =>
    fetcher({
      endpoint: joinUrl(endpoint, mergeSearch({ limit: 100, ...searchParams })),
      method: 'GET',
    }),
});

const apiMethodsGifs = createApiMethodsGifs(config.endpoints.giphy)(apiKeyGiphyProxy);

export default apiMethodsGifs;
