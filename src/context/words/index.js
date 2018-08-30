import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { api } from '../../api';
import { notificationType } from '../../components/notification-item/component';
import loadingNames from '../../defaults/loading-names';
import { withFoundWord } from '../foundWord';
import { withLoadingNames } from '../loading-names';
import { withNotifications } from '../notifications';

const WordsContext = createContext({});

const wordsInitialState = {
  words: [],
};

class WordsProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showNotification: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    setFoundWord: PropTypes.func.isRequired,
  };

  state = wordsInitialState;

  cleanWords = () =>
    this.setState(prevState => ({
      ...prevState,
      words: wordsInitialState.words,
    }));

  handleFetchWords = () => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.wordsList))
      .then(() => api.getWordsList())
      .then(words => this.setState({ words }))
      .then(() => stopLoading(loadingNames.wordsList))
      .catch(err => showNotification(err.message, notificationType.error))
      .then(() => stopLoading(loadingNames.wordsList))
  };

  handleSaveWord = data => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.saveWord))
      .then(() => api.saveWord(data))
      .then(() => stopLoading(loadingNames.saveWord))
      .then(() => showNotification('The word has been added successfully', notificationType.success))
      .catch(err => showNotification(err.message, notificationType.error))
      .then(() => stopLoading(loadingNames.saveWord))
  };

  handleDeleteWord = id => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.deleteWord))
      .then(() => api.deleteWord(id))
      .then(() => stopLoading(loadingNames.deleteWord))
      .catch(err => showNotification(err.message, notificationType.error))
      .then(() => stopLoading(loadingNames.deleteWord))
      .then(() => this.handleFetchWords());
  };

  handleSearchWord = params => {
    const { showNotification, startLoading, stopLoading, setFoundWord } = this.props;

    return Promise.resolve(startLoading(loadingNames.searchWord))
      .then(() => api.searchWord(params))
      .then(foundWord => setFoundWord(foundWord))
      .then(() => stopLoading(loadingNames.searchWord))
      .catch(err => showNotification(err.message, notificationType.error))
      .then(() => stopLoading(loadingNames.searchWord))
  };

  render() {
    const { words } = this.state;
    const { children } = this.props;

    return (
      <WordsContext.Provider
        value={{
          words,
          fetchWords: this.handleFetchWords,
          saveWord: this.handleSaveWord,
          searchWord: this.handleSearchWord,
          deleteWord: this.handleDeleteWord,
          cleanWords: this.cleanWords,
        }}
      >{children}</WordsContext.Provider>
    );
  }
}

const WordsProvider = compose(
  withFoundWord,
  withLoadingNames,
  withNotifications,
)(WordsProviderCmp);

const withWords = Cmp => props =>
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>;

export { WordsProvider, withWords, wordsInitialState };
