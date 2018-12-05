import { joinUrl } from "../helpers/join-url";
import requests from "./request";
import createFetcherJson from "./create-fetcher";
import { createGoogleAuthProxy } from "./proxies";

const { REACT_APP_ENDPOINT_WORDS } = process.env;

export const createApiMethodsWords = endpoint => fetcher => ({
  create: (body, tokens) => fetcher(requests.post(endpoint, { body }), tokens),
  get: (id, tokens) =>
    fetcher(requests.get(joinUrl({ url: endpoint, paths: [id] })), tokens),
  getList: (body, tokens) =>
    fetcher(requests.post(joinUrl({ url: endpoint, paths: ["list"] }), { body }), tokens),
  getListToLearn: (params, tokens) => {
    const url = joinUrl({ url: endpoint, paths: ["list"] });
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
    return fetcher(
      requests.post(url, {
        body: {
          timesLearnt: { $gte: 0, $lte: 5 },
          dateLastLearnt: { $gte: new Date(0), $lte: yesterday },
          ...params
        }
      }),
      tokens
    );
  },
  update: (word, tokens) =>
    fetcher(requests.put(joinUrl({ url: endpoint, paths: [word._id] }), { body: word }), tokens),
  delete: (wordId, tokens) =>
    fetcher(requests.delete(joinUrl({ url: endpoint, paths: [wordId] })), tokens),
  learn: (wordId, tokens) =>
    fetcher(
      requests.put(joinUrl({ url: endpoint, paths: [wordId] }), {
        body: {
          dateLastLearnt: new Date(Date.now()).toISOString(),
          $inc: { timesLearnt: 1 }
        }
      }),
      tokens
    ),
  search: (params, tokens) =>
    fetcher(requests.post(joinUrl({ url: endpoint, paths: ["search-new"] }), { body: params }), tokens)
});

const apiMethodsWords = createApiMethodsWords(REACT_APP_ENDPOINT_WORDS)(
  createGoogleAuthProxy(createFetcherJson(window.fetch))
);

export default apiMethodsWords;
