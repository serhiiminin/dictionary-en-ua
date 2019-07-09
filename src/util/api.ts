import { joinPath } from 'url-joiner';

interface Request {
  headers?: object;
}

const addAuthTokenToRequest = (token: string, request: Request = {}): Request => ({
  ...request,
  headers: Object.assign({}, request.headers, { authorization: `Bearer ${token}` }),
});

type FN = (...path: string[]) => string;

const joinEndpoint = (endpoint: string): FN => (...paths: string[]): string => joinPath(endpoint, ...paths);

export { addAuthTokenToRequest, joinEndpoint };
