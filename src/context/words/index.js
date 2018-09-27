import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { api } from '../../api';
import { notificationType } from '../../components/notification-item/component';
import loadingNames from '../../constants/loading-names';
import { parseSearchParams } from '../../helpers/search-params';
import { withFoundWord } from '../foundWord';
import { withLoadingNames } from '../loading-names';
import { withNotifications } from '../notifications';

const WordsContext = createContext({});

const INITIAL_WORD_SORT_DATA = {
  sortBy: 'dateCreated',
  sortDirection: 'descend',
  page: 1,
  countPerPage: 5,
};

const wordsInitialState = {
  words: [],
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

  cleanWords = () => this.setState({ words: wordsInitialState.words });

  getSearchParams = () => {
    const { location } = this.props;
    const { sortBy, sortDirection, page, countPerPage } = INITIAL_WORD_SORT_DATA;
    const parsedParams = parseSearchParams(location.search);

    return {
      sortBy: parsedParams.sortBy || sortBy,
      sortDirection: parsedParams.sortDirection || sortDirection,
      page: Number(parsedParams.page) || page,
      countPerPage: Number(parsedParams.countPerPage) || countPerPage,
    }

  };

  handleFetchWords = () => {
    const { showNotification, startLoading, stopLoading, location } = this.props;
    const { sortBy, sortDirection, page, countPerPage } = this.getSearchParams(location.search);
    const query = {
      skip: (page - 1) * countPerPage,
      limit: Number(countPerPage),
      sortDirection: sortDirection === 'descend' ? -1 : 1,
      sortBy,
    };

    return Promise.resolve(startLoading(loadingNames.wordsList))
      .then(() => api.getWordsList({ query }))
      .then(({ items, count }) => this.setState({ words: items, count }))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.wordsList));
  };

  handleFetchWordsToLearn = () => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.learnWord))
      .then(() => api.getWordsListToLearn())
      .then(({ items, count }) => this.setState({ words: items, count }))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.learnWord));
  };

  handleCreateWord = data => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.saveWord))
      .then(() => api.createWord(data))
      .then(() => showNotification('The word has been saved successfully', notificationType.success))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.saveWord));
  };

  handleDeleteWord = id => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.deleteWord))
      .then(() => api.deleteWord(id))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.deleteWord))
      .then(() => this.handleFetchWords());
  };

  handleLearnWord = wordId => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.learnWord))
      .then(() => api.learnWord(wordId))
      .then(() => this.setState(prevState => ({
        words: [...prevState.words.filter(word => word._id !== wordId)]
      })))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.learnWord));

  };

  handleRelearnWord = wordId => {
    this.setState(prevState => {
      const wordToRelearn = prevState.words.find(word => word._id === wordId);

      return ({
        words: [
          ...prevState.words.filter(word => word._id !== wordToRelearn._id),
          wordToRelearn,
        ]
      });
    });
  };

  handleSearchWord = params => {
    const { showNotification, startLoading, stopLoading, setFoundWord } = this.props;

    return Promise.resolve(startLoading(loadingNames.searchWord))
      .then(() => Promise.all([
        api.searchWord(params),
        api.getGifs({ q: params.text })
      ]))
      .then(([foundWord, gifs]) => {
        const downsizedGifs = gifs.data && gifs.data.map(gif => gif.images.downsized_large.url);
        const randomGif = downsizedGifs && downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];

        return setFoundWord({ ...foundWord, gif: randomGif });
      })
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.searchWord));
  };

  render() {
    const { words, count, gif } = this.state;
    const { children } = this.props;

    return (
      <WordsContext.Provider
        value={{
          words,
          gif,
          wordsCount: count,
          getWordsSearchParams: this.getSearchParams,
          fetchWords: this.handleFetchWords,
          fetchWordsToLearn: this.handleFetchWordsToLearn,
          saveWord: this.handleCreateWord,
          searchWord: this.handleSearchWord,
          learnWord: this.handleLearnWord,
          relearnWord: this.handleRelearnWord,
          deleteWord: this.handleDeleteWord,
          cleanWords: this.cleanWords,
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
