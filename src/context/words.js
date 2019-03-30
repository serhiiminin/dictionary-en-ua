import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { parseSearch } from 'url-joiner';
import { apiWord, apiGif } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import { normalizeWord } from '../modules/word-utils';
import { withAuth } from './auth';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../modules/handle-fetch';
import { withErrors } from './errors';

const INITIAL_SORT_DATA = {
  sortBy: 'dateCreated',
  sortDirection: 'descend',
  page: 1,
  countPerPage: 5,
};

const wordsInitialState = {
  wordsList: [],
  wordItem: {},
  count: 0,
  gif: '',
};
const WordsContext = createContext({});

class WordsProviderCmp extends Component {
  static propTypes = {
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

  static defaultProps = {
    tokenData: null,
    user: null,
  };

  state = wordsInitialState;

  handleFetch = () => {
    const { startLoading, stopLoading, handleError } = this.props;

    return createHandleFetch({
      startLoading,
      stopLoading,
      errorHandler: handleError,
    });
  };

  getSearchParams = () => {
    const { location } = this.props;
    const { sortBy, sortDirection, page, countPerPage } = INITIAL_SORT_DATA;
    const parsedParams = parseSearch(location.search);

    return {
      sortBy: parsedParams.sortBy || sortBy,
      sortDirection: parsedParams.sortDirection || sortDirection,
      page: Number(parsedParams.page) || page,
      countPerPage: Number(parsedParams.countPerPage) || countPerPage,
    };
  };

  cleanWordsList = () => this.setState({ wordsList: wordsInitialState.wordsList });

  cleanWord = () => this.setState({ wordItem: wordsInitialState.wordItem });

  setWordToState = wordItem => this.setState({ wordItem });

  fetchWord = wordId => {
    const { tokenData } = this.props;
    const { token } = tokenData || {};

    return this.handleFetch()({
      loadingName: loadingNames.words.fetch,
      apiHandler: apiWord.get(wordId, token).then(wordItem => this.setState({ wordItem })),
    });
  };

  fetchWordsList = () => {
    const { sortBy, sortDirection, page, countPerPage } = this.getSearchParams();
    const { tokenData } = this.props;
    const { _id: ownerId, token } = tokenData || {};
    const query = {
      skip: (page - 1) * countPerPage,
      limit: Number(countPerPage),
      sortDirection: sortDirection === 'descend' ? -1 : 1,
      sortBy,
    };

    return this.handleFetch()({
      loadingName: loadingNames.words.list,
      apiHandler: apiWord.getList({ query, ownerId }, token).then(({ items, count }) => {
        this.setState({ wordsList: items, count });
      }),
    });
  };

  createWord = word => {
    const { tokenData, enqueueSnackbar } = this.props;
    const { _id: ownerId, token } = tokenData || {};

    return this.handleFetch()({
      loadingName: loadingNames.words.save,
      apiHandler: apiWord.create({ ...word, ownerId }, token).then(() =>
        enqueueSnackbar('The word has been saved successfully', {
          variant: notificationType.success,
        })
      ),
    });
  };

  editWord = word => {
    const { tokenData, enqueueSnackbar } = this.props;
    const { token } = tokenData || {};

    return this.handleFetch()({
      loadingName: loadingNames.words.fetch,
      apiHandler: apiWord.update(word, token).then(() =>
        enqueueSnackbar('The word has been updated successfully', {
          variant: notificationType.success,
        })
      ),
    });
  };

  deleteWord = id => {
    const { tokenData, enqueueSnackbar } = this.props;
    const { token } = tokenData || {};

    return this.handleFetch()({
      loadingName: loadingNames.words.delete,
      apiHandler: apiWord
        .delete(id, token)
        .then(this.fetchWordsList)
        .then(() =>
          enqueueSnackbar('The word has been deleted successfully', {
            variant: notificationType.success,
          })
        ),
    });
  };

  searchWord = params => {
    const { tokenData } = this.props;
    const { token } = tokenData || {};

    return this.handleFetch()({
      loadingName: loadingNames.words.search,
      apiHandler: apiWord.search(params, token).then(foundWord =>
        apiGif.get({ q: foundWord.word }).then(gifs => {
          const downsizedGifs = gifs && gifs.data && gifs.data.map(gif => gif.images.downsized_large.url);
          const randomGif = downsizedGifs && downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];

          this.setState({
            wordItem: {
              ...normalizeWord(foundWord),
              gif: randomGif,
            },
          });
        })
      ),
    });
  };

  fetchWordsToLearn = () => {
    const { tokenData } = this.props;
    const { _id: ownerId, token } = tokenData || {};

    return this.handleFetch()({
      loadingName: loadingNames.words.learn,
      apiHandler: apiWord
        .getListToLearn({ ownerId }, token)
        .then(({ items, count }) => this.setState({ wordsList: items, count })),
    });
  };

  learnWord = wordId => {
    const { tokenData } = this.props;
    const { token } = tokenData || {};

    return this.handleFetch()({
      loadingName: loadingNames.words.learn,
      apiHandler: apiWord.learn(wordId, token).then(() =>
        this.setState(prevState => ({
          wordsList: [...prevState.wordsList.filter(({ _id: id }) => id !== wordId)],
        }))
      ),
    });
  };

  relearnWord = wordId => {
    this.setState(prevState => {
      const wordToRelearn = prevState.wordsList.find(({ _id: id }) => id === wordId) || {};
      const { _id: wordToRelearnId } = wordToRelearn;

      return {
        wordsList: [...prevState.wordsList.filter(({ _id: id }) => id !== wordToRelearnId), wordToRelearn],
      };
    });
  };

  render() {
    const { wordsList, wordItem, count, gif } = this.state;
    const { children } = this.props;

    return (
      <WordsContext.Provider
        value={{
          gif,
          wordItem,
          wordsList,
          wordsCount: count,
          getWordsSearchParams: this.getSearchParams,
          setWordToState: this.setWordToState,
          cleanWord: this.cleanWord,
          cleanWordsList: this.cleanWordsList,
          fetchWord: this.fetchWord,
          fetchWordsList: this.fetchWordsList,
          fetchWordsToLearn: this.fetchWordsToLearn,
          editWord: this.editWord,
          deleteWord: this.deleteWord,
          learnWord: this.learnWord,
          relearnWord: this.relearnWord,
          saveWord: this.createWord,
          searchWord: this.searchWord,
        }}
      >
        {children}
      </WordsContext.Provider>
    );
  }
}

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
