import boom from '@hapi/boom';
import { FetchResult, RequestParams } from '../types';

const checkStatus = (response: Response): Response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  throw boom.boomify(error, { statusCode: response.status });
};

const parseJson = (response: Response): FetchResult => response.json();

type F = (params: Request) => Promise<Response>;
type FN = (params: RequestParams) => FetchResult;

const createFetcherJson = (fetcher: F): FN => (params: RequestParams): FetchResult => {
  const { url = '', body, headers, ...restParams } = params;
  const request = new Request(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    }),
    ...restParams,
  });

  return fetcher(request)
    .then(checkStatus)
    .then(parseJson);
};

export default createFetcherJson;
