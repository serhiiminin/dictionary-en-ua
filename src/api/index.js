import { WORDS } from './endpoints';
import { createFetcherJson } from './fetcher';
import { requests } from './request';

const wordRequests = requests(WORDS);
const fetcher = createFetcherJson(window.fetch);

const api = {
  createWord: body => fetcher(wordRequests.create(body)),
  getWord: wordId => fetcher(wordRequests.get(wordId)),
  getWordsList: body => fetcher(wordRequests.getList(body)),
  getWordsListToLearn: () => {
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);
    return fetcher(wordRequests.getList({
      timesLearnt: { $gte: 0, $lte: 5 },
      dateLastLearnt: { $gte: new Date(0), $lte: yesterday }
    }));
  },
  updateWord: (wordId, body) => fetcher(wordRequests.update(wordId, body)),
  deleteWord: wordId => fetcher(wordRequests.delete(wordId)),
  learnWord: wordId => fetcher(wordRequests.update(wordId, {
    dateLastLearnt: new Date(Date.now()).toISOString(),
    $inc: { timesLearnt: 1 }
  })),
  searchWord: params => fetcher(wordRequests.search(params)),
};

export { api };
