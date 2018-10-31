import { WORDS, GIPHY } from './endpoints';
import { fetchProxy, apiKeyGiphyProxy } from './fetch-proxy';
import { joinUrl } from '../helpers/search-params';
import requests from './request';

const api = {
  createWord: body => fetchProxy(requests.post(WORDS, { body })),
  getWord: wordId => {
    const url = joinUrl({ url: WORDS, paths: [wordId]});

    return fetchProxy(requests.get(url));
  },
  getWordsList: body => {
    const url = joinUrl({ url: WORDS, paths: ['list']});

    return fetchProxy(requests.post(url, { body }));
  },
  getWordsListToLearn: () => {
    const url = joinUrl({ url: WORDS, paths: ['list']});
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
    return fetchProxy(requests.post(url, {
      body: {
        timesLearnt: { $gte: 0, $lte: 5 },
        dateLastLearnt: { $gte: new Date(0), $lte: yesterday }
      }
    }));
  },
  updateWord: word => {
    const url = joinUrl({ url: WORDS, paths: [word._id]});

    return fetchProxy(requests.put(url, { body: word }));
  },
  deleteWord: wordId => {
    const url = joinUrl({ url: WORDS, paths: [wordId]});

    return fetchProxy(requests.delete(url));
  },
  learnWord: wordId => {
    const url = joinUrl({ url: WORDS, paths: [wordId]});

    return fetchProxy(requests.put(url, {
        body: {
          dateLastLearnt: new Date(Date.now()).toISOString(),
          $inc: { timesLearnt: 1 }
        }
      }
    ));
  },
  searchWord: params => {
    const url = joinUrl({ url: WORDS, paths: ['search-new']});

    return fetchProxy(requests.post(url, { body: params }));
  },
  getGifs: searchParams =>
    apiKeyGiphyProxy(
      requests.get(joinUrl({
        url: GIPHY,
        searchParams: {
          limit: 100,
          ...searchParams
        }
      })),
    )
};

export default api;
