import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../api/fetcher';

const WordsContext = createContext('words');

class WordsProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    words: []
  };

  // shouldComponentUpdate(nextProps, nextState)  {
  //   const prevWords = this.context.words.map(w => w.dateLastUpdated).join('');
  //   const nextWords = nextState.words.map(w => w.dateLastUpdated).join('');
  //
  //   return prevWords !== nextWords;
  // }

  handleFetchWords = () =>
    api.getWordsList()
      .then(words => this.setState({ words }));

  handleAddWord = data =>
    api.addWord({ ...data })
      .then(() => this.handleFetchWords());

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
        }}
      >{this.props.children}</WordsContext.Provider>
    )
  }
}

export const withWords = Cmp => props =>
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>;
export default WordsProvider;
