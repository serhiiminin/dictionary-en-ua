import { WORDS } from './endpoints';
import { createFetcherJson } from './fetcher';
import { requests } from './request';

const wordRequests = requests(WORDS);
const fetcher = createFetcherJson(window.fetch);

const api = {
  getWord: wordId => fetcher(wordRequests.getEntity(wordId)),
  getWordsList: () => fetcher(wordRequests.getEntitiesList()),
  getWordsListToLearn: () => fetcher(wordRequests.getEntitiesListToLearn()),
  learnWord: wordId => fetcher(wordRequests.learnEntity(wordId)),
  searchWord: params => fetcher(wordRequests.search(params)),
  saveWord: params => fetcher(wordRequests.addEntity(params)),
  updateWord: (wordId, params) => fetcher(wordRequests.updateEntity(wordId, params)),
  deleteWord: wordId => fetcher(wordRequests.deleteEntity(wordId)),
};

export { api };
