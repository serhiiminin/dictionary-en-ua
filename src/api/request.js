import urljoin from 'url-join';

const requests = url => ({
  getEntity: wordId => ({
    endpoint: urljoin(url, wordId),
    method: 'GET',
  }),
  getEntitiesList: () => ({
    endpoint: url,
    method: 'GET',
  }),
  getEntitiesListToLearn: () => ({
    endpoint: urljoin(url, 'list-learn'),
    method: 'GET',
  }),
  learnEntity: wordId => ({
    endpoint: urljoin(url, wordId, '_learn'),
    method: 'PUT',
  }),
  search: body => ({
    endpoint: urljoin(url, '_search'),
    method: 'POST',
    body
  }),
  addEntity: body => ({
    endpoint: url,
    method: 'POST',
    body,
  }),
  updateEntity: (wordId, body) => ({
    endpoint: urljoin(url, wordId),
    method: 'PUT',
    body,
  }),
  deleteEntity: wordId => ({
    endpoint: urljoin(url, wordId),
    method: 'DELETE',
  })
});

export { requests };
