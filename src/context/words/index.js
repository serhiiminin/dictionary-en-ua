import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../api/fetcher';

const WordsContext = createContext({});

const initialState = {
  words: [],
};

class WordsProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  cleanWords = () =>
    this.setState(prevState => ({
      ...prevState,
      words: initialState.words,
    }));

  handleFetchWords = () =>
    api.getWordsList()
      .then(words => this.setState({ words }));

  handleAddWord = data =>
    api.addWord({ ...data })
      .then(() => this.cleanFoundWord());

  handleDeleteWord = id =>
    api.deleteWord(id)
      .then(() => this.handleFetchWords());

  handleSearchWord = params =>
    api.searchWord(params);

  render() {
    const { words } = this.state;

    return (
      <WordsContext.Provider
        value={{
          words,
          fetchWords: this.handleFetchWords,
          addWord: this.handleAddWord,
          searchWord: this.handleSearchWord,
          deleteWord: this.handleDeleteWord,
          cleanWords: this.cleanWords,
        }}
      >{this.props.children}</WordsContext.Provider>
    );
  }
}

const withWords = Cmp => props =>
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>;

export { WordsProvider, withWords };
