import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { parseSearch } from 'url-joiner';
import { apiWord, apiGif } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import { normalizeWord } from '../util/word-utils';
import { withAuth } from './auth';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../util/handle-fetch';
import { withErrors } from './errors';

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

const WordsProviderCmp = ({
  startLoading,
  stopLoading,
  handleError,
  location,
  tokenData,
  enqueueSnackbar,
  children,
}) => {
  const [wordsList, setWordsList] = useState([]);
  const [wordItem, setWordItem] = useState({});
  const [count, setCount] = useState(0);

  const handleFetch = createHandleFetch({
    startLoading,
    stopLoading,
    errorHandler: handleError,
  });
  const { token, _id: ownerId } = tokenData || {};

  const cleanWordsList = () => setWordsList([]);

  const cleanWord = () => setWordItem({});

  const setWordToState = wordData => setWordItem(wordData);

  const fetchWord = wordId =>
    handleFetch({
      loadingName: loadingNames.words.fetch,
      apiHandler: apiWord.get(wordId, token).then(setWordToState),
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
      loadingName: loadingNames.words.list,
      apiHandler: apiWord.getList({ query, ownerId }, token).then(({ items, count: wordsCount }) => {
        setWordsList(items);
        setCount(wordsCount);
      }),
    });
  };

  const createWord = word =>
    handleFetch({
      loadingName: loadingNames.words.save,
      apiHandler: apiWord.create({ ...word, ownerId }, token).then(() =>
        enqueueSnackbar('The word has been saved successfully', {
          variant: notificationType.success,
        })
      ),
    });

  const editWord = word =>
    handleFetch({
      loadingName: loadingNames.words.fetch,
      apiHandler: apiWord.update(word, token).then(() =>
        enqueueSnackbar('The word has been updated successfully', {
          variant: notificationType.success,
        })
      ),
    });

  const deleteWord = id =>
    handleFetch({
      loadingName: loadingNames.words.delete,
      apiHandler: apiWord
        .delete(id, token)
        .then(fetchWordsList)
        .then(() =>
          enqueueSnackbar('The word has been deleted successfully', {
            variant: notificationType.success,
          })
        ),
    });

  const searchWord = params =>
    handleFetch({
      loadingName: loadingNames.words.search,
      apiHandler: apiWord.search(params, token).then(foundWord =>
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
      loadingName: loadingNames.words.learn,
      apiHandler: apiWord.getListToLearn({ ownerId }, token).then(({ items, count: wordsCount }) => {
        setWordsList(items);
        setCount(wordsCount);
      }),
    });

  const learnWord = wordId =>
    handleFetch({
      loadingName: loadingNames.words.learn,
      apiHandler: apiWord
        .learn(wordId, token)
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
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  tokenData: PropTypes.shape({
    token: PropTypes.string,
    _id: PropTypes.string,
    email: PropTypes.string,
    expiresAt: PropTypes.number,
  }),
  user: PropTypes.shape({}),
};

WordsProviderCmp.defaultProps = {
  tokenData: null,
  user: null,
};

const WordsProvider = compose(
  withRouter,
  withAuth,
  withLoadingNames,
  withSnackbar,
  withErrors
)(WordsProviderCmp);

const withWords = Cmp => props => (
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>
);

export { WordsProvider, withWords };
