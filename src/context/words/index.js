import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { api } from '../../api';
import { notificationType } from '../../components/notification-item/component';
import loadingNames from '../../constants/loading-names';
import { parseSearchParams } from '../../helpers/search-params';
import { withFoundWord } from '../found-word';
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
    }

  };

  handleFetchWord = wordId => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.editWord))
      .then(() => api.getWord(wordId))
      .then(word => this.setState({ word }))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.editWord));
  };

  handleFetchWordsList = () => {
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
      .then(({ items, count }) => this.setState({ wordsList: items, count }))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.wordsList));
  };

  handleFetchWordsToLearn = () => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.learnWord))
      .then(() => api.getWordsListToLearn())
      .then(({ items, count }) => this.setState({ wordsList: items, count }))
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

  handleEditWord = (wordId, data) => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.editWord))
      .then(() => api.updateWord(wordId, data))
      .then(() => showNotification('The word has been updated successfully', notificationType.success))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.editWord));
  };

  handleDeleteWord = id => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.deleteWord))
      .then(() => api.deleteWord(id))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.deleteWord))
      .then(() => this.handleFetchWordsList());
  };

  handleLearnWord = wordId => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.learnWord))
      .then(() => api.learnWord(wordId))
      .then(() => this.setState(prevState => ({
        wordsList: [...prevState.wordsList.filter(word => word._id !== wordId)]
      })))
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.learnWord));

  };

  handleRelearnWord = wordId => {
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

  handleSearchWord = params => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.searchWord))
      .then(() => Promise.all([
        api.searchWord(params),
        api.getGifs({ q: params.text }),
      ]))
      .then(([foundWord, gifs]) => {
        const downsizedGifs = gifs && gifs.data && gifs.data.map(gif => gif.images.downsized_large.url);
        const randomGif = downsizedGifs && downsizedGifs[Math.round(Math.random() * downsizedGifs.length)];

        return this.props.setFoundWord({ ...foundWord, gif: randomGif })
      })
      .catch(err => showNotification(err.message, notificationType.error))
      .finally(() => stopLoading(loadingNames.searchWord));
  };

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
          fetchWord: this.handleFetchWord,
          fetchWordsList: this.handleFetchWordsList,
          fetchWordsToLearn: this.handleFetchWordsToLearn,
          saveWord: this.handleCreateWord,
          editWord: this.handleEditWord,
          searchWord: this.handleSearchWord,
          learnWord: this.handleLearnWord,
          relearnWord: this.handleRelearnWord,
          deleteWord: this.handleDeleteWord,
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
