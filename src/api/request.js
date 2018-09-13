const requests = {
  get: (url, params) => ({
    endpoint: url,
    method: 'GET',
    ...params,
  }),
  post: (url, params) => ({
    endpoint: url,
    method: 'POST',
    ...params,
  }),
  put: (url, params) => ({
    endpoint: url,
    method: 'PUT',
    ...params,
  }),
  patch: (url, params) => ({
    endpoint: url,
    method: 'PATCH',
    ...params,
  }),
  delete: (url, params) => ({
    endpoint: url,
    method: 'DELETE',
    ...params,
  }),
};

export { requests };
