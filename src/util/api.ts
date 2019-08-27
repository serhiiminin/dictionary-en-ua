import { joinPath } from 'url-joiner';
import { RequestParams } from '../types';

const addAuthTokenToRequest = (token: string, request?: RequestParams): RequestParams => ({
  ...request,
  headers: { ...((request && request.headers) || {}), authorization: `Bearer ${token}` },
});

type FN = (...path: string[]) => string;

const joinEndpoint = (endpoint: string): FN => (...paths: string[]): string => joinPath(endpoint, ...paths);

export { addAuthTokenToRequest, joinEndpoint };
