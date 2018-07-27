import { DICTIONARY } from './endpoints';
import { joinUrl } from './utils';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  error.response = response;
  throw error;
};

const parseJSON = response => response.json();

const fetchJSON = (url, params) =>
  window.fetch(url, params)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      console.log(error.status);
      if (error.message === 'Failed to fetch' && !window.navigator.onLine) {
        throw new Error('Check your internet connection');
      }
      throw new Error(error);
    });



const api = (path, params = {}) => {
  const endpoint = joinUrl(DICTIONARY, path);
  return fetchJSON(endpoint, params);
};

export { api };
