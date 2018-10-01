import { createFetcherJson } from './fetcher';

const fetcher = createFetcherJson(window.fetch);

const fetchProxy = params =>
  fetcher(params)
    .catch(error => {
      if (error.message === 'Failed to fetch') {
        if (!window.navigator.onLine) {
          throw new Error('Check your internet connection');
        }
      }
      throw new Error(error);
    });

export { fetchProxy };
