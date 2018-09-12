import urljoin from 'url-join';

const requests = url => ({
  create: body => ({
    endpoint: url,
    method: 'POST',
    body,
  }),
  get: wordId => ({
    endpoint: urljoin(url, wordId),
    method: 'GET',
  }),
  getList: (body = {}) => ({
    endpoint: urljoin(url, 'list'),
    method: 'POST',
    body,
  }),
  update: (wordId, body) => ({
    endpoint: urljoin(url, wordId),
    method: 'PUT',
    body,
  }),
  delete: wordId => ({
    endpoint: urljoin(url, wordId),
    method: 'DELETE',
  }),
  search: body => ({
    endpoint: urljoin(url, 'search-new'),
    method: 'POST',
    body
  }),
});

export { requests };
