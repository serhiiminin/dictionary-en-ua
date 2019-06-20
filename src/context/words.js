import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { parseSearch } from 'url-joiner';
import { createApiWord, apiGif } from '../api';
import NT from '../constants/notifications-type';
import LN from '../constants/loading-names';
import { withAuth } from './auth';
import { withFetcher } from './fetcher';

const INITIAL_SORT_DATA = {
  sortBy: 'dateCreated',
  sortDirection: 'descend',
  page: 1,
  countPerPage: 5,
};

const getWordsSearchParams = search => {
  const { sortBy, sortDirection, page, countPerPage } = INITIAL_SORT_DATA;
  const parsedParams = parseSearch(search);

  return {
    sortBy: parsedParams.sortBy || sortBy,
    sortDirection: parsedParams.sortDirection || sortDirection,
    page: Number(parsedParams.page) || page,
    countPerPage: Number(parsedParams.countPerPage) || countPerPage,
  };
};

const generateQuery = ({ page, countPerPage, sortDirection, sortBy }) => ({
  skip: (page - 1) * countPerPage,
  limit: Number(countPerPage),
  sortDirection: sortDirection === 'descend' ? -1 : 1,
  sortBy,
});

const getRandlomGif = (gifs = []) => {
  const gifData = gifs || [];
  const downsizedGifs = gifData.map(gif => gif.images.downsized_large.url);

  return downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];
};

const WordsContext = createContext({});

const WordsProviderCmp = props => {
  const { handleFetch, location, tokenData, enqueueSnackbar, children } = props;
  const { token, _id: ownerId } = tokenData || {};
  const apiWord = createApiWord(token);
  const [wordsList, setWordsList] = useState([]);
  const [wordItem, setWordItem] = useState({});
  const [wordsCount, setWordsCount] = useState(0);

  const cleanWordsList = () => setWordsList([]);

  const cleanWord = () => setWordItem({});

  const handleFetchWord = wordId =>
    handleFetch(LN.words.fetch)(async () => {
      cleanWord();
      const word = await apiWord.get(wordId);
      setWordItem(word);
    });

  const handleFetchWordsList = () => {
    const query = generateQuery(getWordsSearchParams(location.search));

    return handleFetch(LN.words.list)(async () => {
      const { items, count } = await apiWord.getList({ query, ownerId });
      setWordsList(items);
      setWordsCount(count);
    });
  };

  const handleCreateWord = () =>
    handleFetch(LN.words.save)(async () => {
      const { _id } = await apiWord.create({ ...wordItem, ownerId });
      await handleFetchWord(_id);
      enqueueSnackbar('The word has been saved successfully', { variant: NT.success });
    });

  const handleEditWord = word =>
    handleFetch(LN.words.fetch)(async () => {
      const { _id } = await apiWord.update(word);
      await handleFetchWord(_id);
      enqueueSnackbar('The word has been updated successfully', { variant: NT.success });
    });

  const handleDeleteWord = id =>
    handleFetch(LN.words.delete)(async () => {
      await apiWord.delete(id);
      await handleFetchWordsList();
      enqueueSnackbar('The word has been deleted successfully', { variant: NT.success });
    });

  const handleSearchWord = word =>
    handleFetch(LN.words.search)(async () => {
      cleanWord();
      const foundWord = await apiWord.search({ word });
      const gifs = await apiGif.get({ q: foundWord.word });
      const randomGif = gifs && getRandlomGif(gifs.data);
      const wordData = JSON.parse(JSON.stringify(foundWord));

      if (randomGif) {
        wordData.gif = randomGif;
      }
      setWordItem(wordData);
    });

  const handleFetchWordsToLearn = () =>
    handleFetch(LN.words.learn)(async () => {
      const { items, count } = await apiWord.getListToLearn({ ownerId });
      setWordsList(items);
      setWordsCount(count);
    });

  const handleLearnWord = wordId =>
    handleFetch(LN.words.learn)(async () => {
      await apiWord.learn(wordId);
      setWordsList(prevState => [...prevState.wordsList.filter(({ _id }) => _id !== wordId)]);
    });

  const handleRelearnWord = wordId => {
    setWordsList(prevState => {
      const wordToRelearn = prevState.wordsList.find(({ _id }) => _id === wordId) || {};
      const { _id: wordToRelearnId } = wordToRelearn;

      return [...prevState.wordsList.filter(({ _id }) => _id !== wordToRelearnId), wordToRelearn];
    });
  };

  return (
    <WordsContext.Provider
      value={{
        wordItem,
        wordsList,
        wordsCount,
        cleanWord,
        cleanWordsList,
        handleFetchWord,
        handleFetchWordsList,
        handleFetchWordsToLearn,
        handleEditWord,
        handleDeleteWord,
        handleLearnWord,
        handleRelearnWord,
        handleCreateWord,
        handleSearchWord,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};

WordsProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  tokenData: PropTypes.shape({
    token: PropTypes.string,
    _id: PropTypes.string,
    email: PropTypes.string,
    expiresAt: PropTypes.number,
  }),
};

WordsProviderCmp.defaultProps = {
  tokenData: null,
};

const WordsProvider = compose(
  withRouter,
  withFetcher,
  withAuth,
  withSnackbar
)(WordsProviderCmp);

const withWords = Cmp => props => (
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>
);

export { WordsProvider, withWords };
