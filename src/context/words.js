import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import api from '../api';
import { notificationType } from '../components/notification-item/component';
import loadingNames from '../constants/loading-names';
import { parseSearchParams } from '../helpers/search-params';
import { withFoundWord } from './found-word';
import { withLoadingNames } from './loading-names';
import { withNotifications } from './notifications';

const WordsContext = createContext({});

const INITIAL_WORD_SORT_DATA = {
  sortBy: 'dateCreated',
  sortDirection: 'descend',
  page: 1,
  countPerPage: 5,
};

const wordsInitialState = {
  wordsList: [],
  word: {},
  count: 0,
  gif: '',
};

class WordsProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showNotification: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    setFoundWord: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  };

  state = wordsInitialState;

  cleanWordsList = () => this.setState({ wordsList: wordsInitialState.wordsList });

  cleanWord = () => this.setState({ word: wordsInitialState.word });

  getSearchParams = () => {
    const { location } = this.props;
    const { sortBy, sortDirection, page, countPerPage } = INITIAL_WORD_SORT_DATA;
    const parsedParams = parseSearchParams(location.search);

    return {
      sortBy: parsedParams.sortBy || sortBy,
      sortDirection: parsedParams.sortDirection || sortDirection,
      page: Number(parsedParams.page) || page,
      countPerPage: Number(parsedParams.countPerPage) || countPerPage,
    };
  };

  handleFetch = ({ loadingName, requestHandler, responseHandler }) => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingName))
      .then(requestHandler || (response => response))
      .then(responseHandler || (response => response))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingName));
  };

  fetchWord = wordId =>
    this.handleFetch({
      loadingName: loadingNames.fetchWord,
      requestHandler: () => api.getWord(wordId),
      responseHandler: word => this.setState({ word }),
    });

  fetchWordsList = () => {
    const { location } = this.props;
    const { sortBy, sortDirection, page, countPerPage } = this.getSearchParams(location.search);
    const query = {
      skip: (page - 1) * countPerPage,
      limit: Number(countPerPage),
      sortDirection: sortDirection === 'descend' ? -1 : 1,
      sortBy,
    };
    return this.handleFetch({
      loadingName: loadingNames.wordsList,
      requestHandler: () => api.getWordsList({ query }),
      responseHandler: ({ items, count }) => this.setState({ wordsList: items, count }),
    });
  };

  fetchWordsToLearn = () =>
    this.handleFetch({
      loadingName: loadingNames.learnWord,
      requestHandler: () => api.getWordsListToLearn(),
      responseHandler: ({ items, count }) => this.setState({ wordsList: items, count }),
    });

  createWord = data =>
    this.handleFetch({
      loadingName: loadingNames.saveWord,
      requestHandler: () => api.createWord(data),
      responseHandler: () => this.props.showNotification('The word has been saved successfully', notificationType.success),
    });

  editWord = word =>
    this.handleFetch({
      loadingName: loadingNames.fetchWord,
      requestHandler: () => api.updateWord(word),
      responseHandler: () => this.props.showNotification('The word has been updated successfully', notificationType.success),
    });

  deleteWord = id =>
    this.handleFetch({
      loadingName: loadingNames.deleteWord,
      requestHandler: () => api.deleteWord(id),
      responseHandler: () => this.fetchWordsList()
        .then(() => this.props.showNotification('The word has been deleted successfully', notificationType.success))
    });

  learnWord = wordId =>
    this.handleFetch({
      loadingName: loadingNames.learnWord,
      requestHandler: () => api.learnWord(wordId),
      responseHandler: () => this.setState(prevState => ({
        wordsList: [...prevState.wordsList.filter(word => word._id !== wordId)]
      })),
    });

  relearnWord = wordId => {
    this.setState(prevState => {
      const wordToRelearn = prevState.wordsList.find(word => word._id === wordId);

      return ({
        wordsList: [
          ...prevState.wordsList.filter(word => word._id !== wordToRelearn._id),
          wordToRelearn,
        ]
      });
    });
  };

  searchWord = params =>
    this.handleFetch({
      loadingName: loadingNames.searchWord,
      requestHandler: () => api.searchWord(params),
      responseHandler: foundWord => api.getGifs({ q: foundWord.en })
          .then(gifs => {
            const downsizedGifs = gifs && gifs.data && gifs.data.map(gif => gif.images.downsized_large.url);
            const randomGif = downsizedGifs && downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];

            return this.props.setFoundWord({ ...foundWord, gif: randomGif });
          }),
    });

  render() {
    const { wordsList, word, count, gif } = this.state;
    const { children } = this.props;

    return (
      <WordsContext.Provider
        value={{
          word,
          wordsList,
          gif,
          wordsCount: count,
          getWordsSearchParams: this.getSearchParams,
          fetchWord: this.fetchWord,
          fetchWordsList: this.fetchWordsList,
          fetchWordsToLearn: this.fetchWordsToLearn,
          saveWord: this.createWord,
          editWord: this.editWord,
          searchWord: this.searchWord,
          learnWord: this.learnWord,
          relearnWord: this.relearnWord,
          deleteWord: this.deleteWord,
          cleanWordsList: this.cleanWordsList,
          cleanWord: this.cleanWord,
        }}
      >{children}</WordsContext.Provider>
    );
  }
}

const WordsProvider = compose(
  withRouter,
  withFoundWord,
  withLoadingNames,
  withNotifications,
)(WordsProviderCmp);

const withWords = Cmp => props =>
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>;

export { WordsProvider, withWords };
