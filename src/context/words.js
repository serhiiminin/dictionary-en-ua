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
import { normalizeWord } from '../util/word-utils';
import { withAuth } from './auth';
import { withFetcher } from './fetcher';

const INITIAL_SORT_DATA = {
  sortBy: 'dateCreated',
  sortDirection: 'descend',
  page: 1,
  countPerPage: 5,
};

const getSearchParams = search => {
  const { sortBy, sortDirection, page, countPerPage } = INITIAL_SORT_DATA;
  const parsedParams = parseSearch(search);

  return {
    sortBy: parsedParams.sortBy || sortBy,
    sortDirection: parsedParams.sortDirection || sortDirection,
    page: Number(parsedParams.page) || page,
    countPerPage: Number(parsedParams.countPerPage) || countPerPage,
  };
};

const WordsContext = createContext({});

const WordsProviderCmp = props => {
  const { handleFetch, location, tokenData, enqueueSnackbar, children } = props;
  const { token, _id: ownerId } = tokenData || {};
  const apiWord = createApiWord(token);
  const [wordsList, setWordsList] = useState([]);
  const [wordItem, setWordItem] = useState({});
  const [count, setCount] = useState(0);

  const cleanWordsList = () => setWordsList([]);

  const cleanWord = () => setWordItem({});

  const setWordToState = wordData => setWordItem(wordData);

  const fetchWord = wordId =>
    handleFetch({
      loadingName: LN.words.fetch,
      apiHandler: apiWord.get(wordId).then(setWordToState),
    });

  const fetchWordsList = () => {
    const { sortBy, sortDirection, page, countPerPage } = getSearchParams(location.search);
    const query = {
      skip: (page - 1) * countPerPage,
      limit: Number(countPerPage),
      sortDirection: sortDirection === 'descend' ? -1 : 1,
      sortBy,
    };

    return handleFetch({
      loadingName: LN.words.list,
      apiHandler: apiWord.getList({ query, ownerId }).then(({ items, count: wordsCount }) => {
        setWordsList(items);
        setCount(wordsCount);
      }),
    });
  };

  const createWord = word =>
    handleFetch({
      loadingName: LN.words.save,
      apiHandler: apiWord
        .create({ ...word, ownerId })
        .then(() => enqueueSnackbar('The word has been saved successfully', { variant: NT.success })),
    });

  const editWord = word =>
    handleFetch({
      loadingName: LN.words.fetch,
      apiHandler: apiWord
        .update(word)
        .then(() => enqueueSnackbar('The word has been updated successfully', { variant: NT.success })),
    });

  const deleteWord = id =>
    handleFetch({
      loadingName: LN.words.delete,
      apiHandler: apiWord
        .delete(id)
        .then(fetchWordsList)
        .then(() => enqueueSnackbar('The word has been deleted successfully', { variant: NT.success })),
    });

  const searchWord = params =>
    handleFetch({
      loadingName: LN.words.search,
      apiHandler: apiWord.search(params).then(foundWord =>
        apiGif.get({ q: foundWord.word }).then(gifs => {
          const downsizedGifs = gifs && gifs.data && gifs.data.map(gif => gif.images.downsized_large.url);
          const randomGif = downsizedGifs && downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];

          setWordItem({
            ...normalizeWord(foundWord),
            gif: randomGif,
          });
        })
      ),
    });

  const fetchWordsToLearn = () =>
    handleFetch({
      loadingName: LN.words.learn,
      apiHandler: apiWord.getListToLearn({ ownerId }).then(({ items, count: wordsCount }) => {
        setWordsList(items);
        setCount(wordsCount);
      }),
    });

  const learnWord = wordId =>
    handleFetch({
      loadingName: LN.words.learn,
      apiHandler: apiWord
        .learn(wordId)
        .then(() => setWordsList(prevState => [...prevState.wordsList.filter(({ _id: id }) => id !== wordId)])),
    });

  const relearnWord = wordId => {
    setWordsList(prevState => {
      const wordToRelearn = prevState.wordsList.find(({ _id: id }) => id === wordId) || {};
      const { _id: wordToRelearnId } = wordToRelearn;

      return [...prevState.wordsList.filter(({ _id: id }) => id !== wordToRelearnId), wordToRelearn];
    });
  };

  return (
    <WordsContext.Provider
      value={{
        wordItem,
        wordsList,
        wordsCount: count,
        getWordsSearchParams: getSearchParams,
        setWordToState,
        cleanWord,
        cleanWordsList,
        fetchWord,
        fetchWordsList,
        fetchWordsToLearn,
        editWord,
        deleteWord,
        learnWord,
        relearnWord,
        saveWord: createWord,
        searchWord,
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
