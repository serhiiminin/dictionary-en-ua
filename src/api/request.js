const createRequest = method => (url, params) => ({
  url,
  method,
  ...params,
});

const requests = {
  get: createRequest('GET'),
  post: createRequest('POST'),
  put: createRequest('PUT'),
  patch: createRequest('PATCH'),
  delete: createRequest('DELETE'),
};

export default requests;
