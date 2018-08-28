import { WORDS } from './endpoints';
import { requests } from './request';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  error.response = response;
  throw error;
};

const parseJson = response => response.json();

const createFetcherJson = fetcher =>
  params => {
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

    return fetcher(request)
      .then(checkStatus)
      .then(parseJson)
      .catch(error => {
        console.log(error, error.status); // eslint-disable-line no-console
        if (error.message === 'Failed to fetch' && !window.navigator.onLine) {
          throw new Error('Check your internet connection');
        }
        throw new Error(error);
      });
  };

const wordRequests = requests(WORDS);
const fetcher = createFetcherJson(window.fetch);

const api = {
  getWord: wordId => fetcher(wordRequests.getEntity(wordId)),
  getWordsList: () => fetcher(wordRequests.getEntitiesList()),
  searchWord: params => fetcher(wordRequests.search(params)),
  saveWord: params => fetcher(wordRequests.addEntity(params)),
  updateWord: (wordId, params) => fetcher(wordRequests.updateEntity(wordId, params)),
  deleteWord: wordId => fetcher(wordRequests.deleteEntity(wordId)),
};

export { api, createFetcherJson };
