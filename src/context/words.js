import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { parseSearchParams } from 'url-joiner';
import { apiWord, apiGif } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import { normalizeWord } from '../modules/word-utils';
import { withAuth } from './auth';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../modules/handle-fetch';
import { withErrors } from './errors';

const WordsContext = createContext({});

const INITIAL_WORD_SORT_DATA = {
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

  handleFetch = createHandleFetch({
    startLoading: this.props.startLoading,
    stopLoading: this.props.stopLoading,
    errorHandler: this.props.handleError,
  });

  getSearchParams = () => {
    const { location } = this.props;
    const {
      sortBy,
      sortDirection,
      page,
      countPerPage,
    } = INITIAL_WORD_SORT_DATA;
    const parsedParams = parseSearchParams(location.search);

    return {
      sortBy: parsedParams.sortBy || sortBy,
      sortDirection: parsedParams.sortDirection || sortDirection,
      page: Number(parsedParams.page) || page,
      countPerPage: Number(parsedParams.countPerPage) || countPerPage,
    };
  };

  cleanWordsList = () =>
    this.setState({ wordsList: wordsInitialState.wordsList });

  cleanWord = () => this.setState({ wordItem: wordsInitialState.wordItem });

  setWordToState = wordItem => this.setState({ wordItem });

  fetchWord = wordId =>
    this.handleFetch({
      token: this.props.tokenData || {},
      loadingName: loadingNames.words.fetch,
      requestHandler: tokenData => apiWord.get(wordId, tokenData.token),
      responseHandler: wordItem => this.setState({ wordItem }),
    });

  fetchWordsList = () => {
    const { location } = this.props;
    const { sortBy, sortDirection, page, countPerPage } = this.getSearchParams(
      location.search
    );
    const query = {
      skip: (page - 1) * countPerPage,
      limit: Number(countPerPage),
      sortDirection: sortDirection === 'descend' ? -1 : 1,
      sortBy,
    };

    return this.handleFetch({
      token: this.props.tokenData || {},
      loadingName: loadingNames.words.list,
      requestHandler: () =>
        apiWord.getList(
          { query, ownerId: this.props.tokenData && this.props.tokenData._id },
          this.props.tokenData && this.props.tokenData.token
        ),
      responseHandler: ({ items = [], count = 0 } = {}) =>
        this.setState({ wordsList: items, count }),
    });
  };

  createWord = word =>
    this.handleFetch({
      token: this.props.tokenData || {},
      loadingName: loadingNames.words.save,
      requestHandler: tokenData =>
        apiWord.create({ ...word, ownerId: tokenData._id }, tokenData.token),
      responseHandler: () =>
        this.props.enqueueSnackbar('The word has been saved successfully', {
          variant: notificationType.success,
        }),
    });

  editWord = word =>
    this.handleFetch({
      token: this.props.tokenData || {},
      loadingName: loadingNames.words.fetch,
      requestHandler: tokenData => apiWord.update(word, tokenData.token),
      responseHandler: () =>
        this.props.enqueueSnackbar('The word has been updated successfully', {
          variant: notificationType.success,
        }),
    });

  deleteWord = id =>
    this.handleFetch({
      token: this.props.tokenData || {},
      loadingName: loadingNames.words.delete,
      requestHandler: tokenData => apiWord.delete(id, tokenData.token),
      responseHandler: () => this.fetchWordsList(),
    }).then(() =>
      this.props.enqueueSnackbar('The word has been deleted successfully', {
        variant: notificationType.success,
      })
    );

  searchWord = params =>
    this.handleFetch({
      token: this.props.tokenData || {},
      loadingName: loadingNames.words.search,
      requestHandler: tokenData => apiWord.search(params, tokenData.token),
      responseHandler: foundWord =>
        apiGif.get({ q: foundWord.word }).then(gifs => {
          const downsizedGifs =
            gifs &&
            gifs.data &&
            gifs.data.map(gif => gif.images.downsized_large.url);
          const randomGif =
            downsizedGifs &&
            downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];

          this.setState({
            wordItem: {
              ...normalizeWord(foundWord),
              gif: randomGif,
            },
          });
        }),
    });

  fetchWordsToLearn = () =>
    this.handleFetch({
      token: this.props.tokenData || {},
      loadingName: loadingNames.words.learn,
      requestHandler: tokenData =>
        apiWord.getListToLearn({ ownerId: tokenData._id }, tokenData.token),
      responseHandler: ({ items, count }) =>
        this.setState({ wordsList: items, count }),
    });

  learnWord = wordId =>
    this.handleFetch({
      token: this.props.tokenData || {},
      loadingName: loadingNames.words.learn,
      requestHandler: tokenData => apiWord.learn(wordId, tokenData.token),
      responseHandler: () =>
        this.setState(prevState => ({
          wordsList: [
            ...prevState.wordsList.filter(word => word._id !== wordId),
          ],
        })),
    });

  relearnWord = wordId => {
    this.setState(prevState => {
      const wordToRelearn = prevState.wordsList.find(
        word => word._id === wordId
      );

      return {
        wordsList: [
          ...prevState.wordsList.filter(word => word._id !== wordToRelearn._id),
          wordToRelearn,
        ],
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
  <WordsContext.Consumer>
    {value => <Cmp {...value} {...props} />}
  </WordsContext.Consumer>
);

export { WordsProvider, withWords };
