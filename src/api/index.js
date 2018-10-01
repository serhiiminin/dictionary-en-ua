import urljoin from 'url-join';
import { WORDS } from './endpoints';
import { fetchProxy, apiKeyGiphyProxy } from './fetch-proxy';
import { requests } from './request';

const api = {
  createWord: body => fetchProxy(requests.post(WORDS, { body })),
  getWord: wordId => {
    const url = urljoin(WORDS, wordId);

    return fetchProxy(requests.get(url));
  },
  getWordsList: body => {
    const url = urljoin(WORDS, 'list');

    return fetchProxy(requests.post(url, { body }));
  },
  getWordsListToLearn: () => {
    const url = urljoin(WORDS, 'list');
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
    return fetchProxy(requests.post(url, {
      body: {
        timesLearnt: { $gte: 0, $lte: 5 },
        dateLastLearnt: { $gte: new Date(0), $lte: yesterday }
      }
    }));
  },
  updateWord: (wordId, body) => {
    const url = urljoin(WORDS, wordId);

    return fetchProxy(requests.put(url, { body }));
  },
  deleteWord: wordId => {
    const url = urljoin(WORDS, wordId);

    return fetchProxy(requests.delete(url));
  },
  learnWord: wordId => {
    const url = urljoin(WORDS, wordId);

    return fetchProxy(requests.put(url, {
        body: {
          dateLastLearnt: new Date(Date.now()).toISOString(),
          $inc: { timesLearnt: 1 }
        }
      }
    ));
  },
  searchWord: params => {
    const url = urljoin(WORDS, 'search-new');

    return fetchProxy(requests.post(url, { body: params }));
  },
  getGifs: searchParams => apiKeyGiphyProxy(requests.get, searchParams)
};

export { api };
