import { apiKeyGiphyProxy } from "./fetch-proxy";
import { joinUrl } from "../helpers/join-url";
import requests from "./request";
import createFetcherJson from "./create-fetcher";

const { 
  REACT_APP_ENDPOINT_WORDS, 
  REACT_APP_ENDPOINT_GIPHY
 } = process.env;

export const createApiMethods = ({ words = '', giphy = '' }) => fetcher => ({
  createWord: body => fetcher(requests.post(words, { body })),
  getWord: wordId => {
    const url = joinUrl({ url: words, paths: [wordId] });

    return fetcher(requests.get(url));
  },
  getWordsList: body => {
    const url = joinUrl({ url: words, paths: ["list"] });

    return fetcher(requests.post(url, { body }));
  },
  getWordsListToLearn: () => {
    const url = joinUrl({ url: words, paths: ["list"] });
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
    return fetcher(
      requests.post(url, {
        body: {
          timesLearnt: { $gte: 0, $lte: 5 },
          dateLastLearnt: { $gte: new Date(0), $lte: yesterday }
        }
      })
    );
  },
  updateWord: word => {
    const url = joinUrl({ url: words, paths: [word._id] });

    return fetcher(requests.put(url, { body: word }));
  },
  deleteWord: wordId => {
    const url = joinUrl({ url: words, paths: [wordId] });

    return fetcher(requests.delete(url));
  },
  learnWord: wordId => {
    const url = joinUrl({ url: words, paths: [wordId] });

    return fetcher(
      requests.put(url, {
        body: {
          dateLastLearnt: new Date(Date.now()).toISOString(),
          $inc: { timesLearnt: 1 }
        }
      })
    );
  },
  searchWord: params => {
    const url = joinUrl({ url: words, paths: ["search-new"] });

    return fetcher(requests.post(url, { body: params }));
  },
  getGifs: searchParams =>
    apiKeyGiphyProxy(
      requests.get(
        joinUrl({
          url: giphy,
          searchParams: {
            limit: 100,
            ...searchParams
          }
        })
      )
    )
});

const api = createApiMethods({
  words: REACT_APP_ENDPOINT_WORDS, 
  giphy: REACT_APP_ENDPOINT_GIPHY,
})(createFetcherJson(window.fetch));

export default api;
