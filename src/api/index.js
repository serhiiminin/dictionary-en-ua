import urljoin from 'url-join';
import { mergeSearchParams } from '../helpers/search-params';
import generatorApiKeys from '../helpers/generator-api-key';
import { GIPHY_API_KEYS } from './credentials';
import { WORDS, GIPHY } from './endpoints';
import { createFetcherJson } from './fetcher';
import { requests } from './request';

const fetcher = createFetcherJson(window.fetch);
const getGiphyKey = generatorApiKeys(GIPHY_API_KEYS);
const giphyKey = getGiphyKey.next();

const api = {
  createWord: body => fetcher(requests.post(WORDS, { body })),
  getWord: wordId => {
    const url = urljoin(WORDS, wordId);

    return fetcher(requests.get(url));
  },
  getWordsList: body => {
    const url = urljoin(WORDS, 'list');

    return fetcher(requests.post(url, { body }));
  },
  getWordsListToLearn: () => {
    const url = urljoin(WORDS, 'list');
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
    return fetcher(requests.post(url, {
      body: {
        timesLearnt: { $gte: 0, $lte: 5 },
        dateLastLearnt: { $gte: new Date(0), $lte: yesterday }
      }
    }));
  },
  updateWord: (wordId, body) => {
    const url = urljoin(WORDS, wordId);

    return fetcher(requests.put(url, { body }));
  },
  deleteWord: wordId => {
    const url = urljoin(WORDS, wordId);

    return fetcher(requests.delete(url));
  },
  learnWord: wordId => {
    const url = urljoin(WORDS, wordId);

    return fetcher(requests.put(url, {
        body: {
          dateLastLearnt: new Date(Date.now()).toISOString(),
          $inc: { timesLearnt: 1 }
        }
      }
    ));
  },
  searchWord: params => {
    const url = urljoin(WORDS, 'search-new');

    return fetcher(requests.post(url, { body: params }));
  },
  getGifs: searchParams => {
    const url = urljoin(GIPHY, `search?${mergeSearchParams({
      api_key: giphyKey.value,
      limit: 100,
      ...searchParams
    })}`);

    return fetcher(requests.get(url));
  }
};

export { api };
