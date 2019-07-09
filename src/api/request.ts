import { RequestParams } from '../types';

type R = (url: string, params?: RequestParams) => RequestParams;

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const PATCH = 'PATCH';
const DELETE = 'DELETE';

const createRequest = (method: string): R => (url: string, params?: RequestParams): RequestParams => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body = {}, ...rest } = params || {};

  return Object.assign({}, { url, method }, method === GET ? rest : params);
};

const requests = {
  get: createRequest(GET),
  post: createRequest(POST),
  put: createRequest(PUT),
  patch: createRequest(PATCH),
  delete: createRequest(DELETE),
};

export default requests;
