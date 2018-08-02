import { WORDS  } from './endpoints';
import { requests } from './request';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  error.response = response;
  throw error;
};

const parseJSON = response => response.json();

const fetchJSON = params => {
  const { endpoint, body, headers, ...restParams } = params;

  const request = new Request(
    endpoint,
    {
      body: JSON.stringify(body),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      }),
      ...restParams,
    },
  );

  return window.fetch(request)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      console.log(error.status);
      if (error.message === 'Failed to fetch' && !window.navigator.onLine) {
        throw new Error('Check your internet connection');
      }
      throw new Error(error);
    });
};

const wordRequests = requests(WORDS);

const api = {
  getWord: wordId => fetchJSON(wordRequests.getEntity(wordId)),
  getWordsList: () => fetchJSON(wordRequests.getEntitiesList()),
  searchWord: params => fetchJSON(wordRequests.search(params)),
  addWord: params => fetchJSON(wordRequests.addEntity(params)),
  updateWord: (wordId, params) => fetchJSON(wordRequests.updateEntity(wordId, params)),
  deleteWord: wordId => fetchJSON(wordRequests.deleteEntity(wordId)),
};

export { api };
