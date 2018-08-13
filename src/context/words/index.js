import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { api } from '../../api/fetcher';
import { notificationType } from '../../components/notifications';
import { loadingNames } from '../../defaults';
import { withFoundWord } from '../foundWord';
import { withLoadingNames } from '../loading-names';
import { withNotifications } from '../notifications';

const WordsContext = createContext({});

const initialState = {
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

  state = initialState;

  cleanWords = () =>
    this.setState(prevState => ({
      ...prevState,
      words: initialState.words,
    }));

  handleFetchWords = () => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.wordsList))
      .then(() => api.getWordsList())
      .then(words => this.setState({ words }))
      .then(() => stopLoading(loadingNames.wordsList))
      .catch(err => showNotification(err.message, notificationType.error))
  };

  handleSaveWord = data => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.saveWord))
      .then(() => api.saveWord(data))
      .then(() => stopLoading(loadingNames.saveWord))
      .catch(err => showNotification(err.message, notificationType.error))
  };

  handleDeleteWord = id => {
    const { showNotification, startLoading, stopLoading } = this.props;

    return Promise.resolve(startLoading(loadingNames.deleteWord))
      .then(() => api.deleteWord(id))
      .then(() => stopLoading(loadingNames.deleteWord))
      .catch(err => showNotification(err.message, notificationType.error))
      .then(() => this.handleFetchWords());
  };

  handleSearchWord = params => {
    const { showNotification, startLoading, stopLoading, setFoundWord } = this.props;

    return Promise.resolve(startLoading(loadingNames.searchWord))
      .then(() => api.searchWord(params))
      .then(foundWord => setFoundWord(foundWord))
      .then(() => stopLoading(loadingNames.searchWord))
      .catch(err => showNotification(err.message, notificationType.error))
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

export { WordsProvider, withWords };
