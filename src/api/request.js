import { joinUrl } from './utils';

const requests = url => ({
  getWord: wordId => ({
    endpoint: joinUrl(url, wordId),
    method: 'GET',
  }),
  getWordsList: () => ({
    endpoint: url,
    method: 'GET',
  }),
  addWord: body => ({
    endpoint: url,
    method: 'POST',
    body,
  }),
  updateWord: (wordId, body) => ({
    endpoint: joinUrl(url, wordId),
    method: 'PUT',
    body,
  }),
  deleteWord: wordId => ({
    endpoint: joinUrl(url, wordId),
    method: 'DELETE',
  })
});

export { requests };
