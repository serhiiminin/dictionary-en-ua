import { joinPath } from 'url-joiner';

const addAuthTokenToRequest = (token, request = {}) => ({
  ...request,
  headers: Object.assign({}, request.headers || {}, {
    authorization: `Bearer ${token}`,
  }),
});

const generateEndpoint = endpoint => (...paths) => joinPath(endpoint, ...paths);

export { addAuthTokenToRequest, generateEndpoint };
