import boom from '@hapi/boom';
import { RequestParams } from '../types';

const checkStatus = (response: Response): Response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  throw boom.boomify(error, { statusCode: response.status });
};

const parseJson = <T>(response: Response): Promise<T> => response.json();

type F = (params: Request) => Promise<Response>;
type FN = <T>(params: RequestParams) => Promise<T>;

const createFetcherJson = (fetcher: F): FN => <T>(params: RequestParams): Promise<T> => {
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
    .then((response: Response): Promise<T> => parseJson<T>(response));
};

export default createFetcherJson;
