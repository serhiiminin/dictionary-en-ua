import { apiKeyGiphyProxy } from "./fetch-proxy";
import { joinUrl } from "../helpers/join-url";
import requests from "./request";
import createFetcherJson from "./create-fetcher";
import createGoogleAuthProxy from './google-auth-proxy';

const { 
  REACT_APP_ENDPOINT_WORDS, 
  REACT_APP_ENDPOINT_GIPHY
 } = process.env;

export const createApiMethods = ({ words = '', giphy = '' }) => fetcher => {
  const googleAuthProxy = createGoogleAuthProxy(fetcher);

  return {
    createWord: (body, tokens) => googleAuthProxy(requests.post(words, { body }), tokens),
    getWord: (wordId, tokens) => {
      const url = joinUrl({ url: words, paths: [wordId] });

      return googleAuthProxy(requests.get(url), tokens);
    },
    getWordsList: (body, tokens) => {
      const url = joinUrl({ url: words, paths: ["list"] });
        
      return googleAuthProxy(requests.post(url, { body }), tokens);
    },
    getWordsListToLearn: tokens => {
      const url = joinUrl({ url: words, paths: ["list"] });
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);
      return googleAuthProxy(
        requests.post(url, {
          body: {
            timesLearnt: { $gte: 0, $lte: 5 },
            dateLastLearnt: { $gte: new Date(0), $lte: yesterday }
          }
        }),
        tokens
      );
    },
    updateWord: (word, tokens) => {
      const url = joinUrl({ url: words, paths: [word._id] });

      return googleAuthProxy(requests.put(url, { body: word }), tokens);
    },
    deleteWord: (wordId, tokens) => {
      const url = joinUrl({ url: words, paths: [wordId] });

      return googleAuthProxy(requests.delete(url), tokens);
    },
    learnWord: (wordId, tokens) => {
      const url = joinUrl({ url: words, paths: [wordId] });

      return googleAuthProxy(
        requests.put(url, {
          body: {
            dateLastLearnt: new Date(Date.now()).toISOString(),
            $inc: { timesLearnt: 1 }
          }
        }),
        tokens
      );
    },
    searchWord: (params, tokens) => {
      const url = joinUrl({ url: words, paths: ["search-new"] });

      return googleAuthProxy(requests.post(url, { body: params }), tokens);
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
  };
};

const api = createApiMethods({
  words: REACT_APP_ENDPOINT_WORDS, 
  giphy: REACT_APP_ENDPOINT_GIPHY,
})(createFetcherJson(window.fetch));

export default api;
