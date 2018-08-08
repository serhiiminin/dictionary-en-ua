import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { api } from '../../api/fetcher';

const WordsContext = createContext([]);

const initialState = {
  words: [],
  foundWord: {
    en: '',
    ru: '',
    transcription: '',
    examples: [],
  }
};

class WordsProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

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
    api.searchWord(params)
      .then(response => {
        const { ru, en, transcription, results } = response;
        const examplesList = results && results
          .reduce((res, val) =>
              val.examples
                ? [...res, ...val.examples.map(example => {
                  const id = uuid();

                  return ({ id, example });
                })]
                : [...res],
            []);

        this.setState({
          foundWord: { en, ru, transcription, examples: examplesList || [], }
        });
      });

  cleanWords = () =>
    this.setState(prevState => ({
      ...prevState,
      words: initialState.words,
    }));

  cleanFoundWord = () =>
    this.setState(prevState => ({
      ...prevState,
      foundWord: initialState.foundWord,
    }));

  render() {
    const { words, foundWord } = this.state;

    return (
      <WordsContext.Provider
        value={{
          words,
          foundWord,
          fetchWords: this.handleFetchWords,
          addWord: this.handleAddWord,
          searchWord: this.handleSearchWord,
          deleteWord: this.handleDeleteWord,
          cleanWords: this.cleanWords,
          cleanFoundWord: this.cleanFoundWord,
        }}
      >{this.props.children}</WordsContext.Provider>
    );
  }
}

const withWords = Cmp => props =>
  <WordsContext.Consumer>{value => <Cmp {...value} {...props} />}</WordsContext.Consumer>;

export { WordsProvider, withWords };
