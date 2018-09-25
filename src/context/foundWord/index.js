import React, { Component, createContext } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const FoundWordContext = createContext({});

const foundWordInitialState = {
  foundWord: {}
};

const mergeArrays = (data, field) =>
  Array.from(
    new Set(
      data && data.reduce((res, val) =>
        val[field]
          ? [...res, ...val[field]]
          : [...res],
      [])));

const normalizeWord = (wordData = {}) => {
  const { en, ua, transcription, results = [], ...rest } = wordData;

  const partOfSpeech = results && Array.from(new Set(results.map(item => item.partOfSpeech)));
  const examples = mergeArrays(results, 'examples')
    .map(example => ({ example, id: uuid() }));
  const definitions = results && results.map(item => item.definition);
  const synonyms = mergeArrays(results, 'synonyms');
  const antonyms = mergeArrays(results, 'antonyms');
  const similarTo = mergeArrays(results, 'similarTo');

  return { en, ua, transcription, examples, definitions, similarTo, synonyms, antonyms, partOfSpeech, ...rest };
};

class FoundWordProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = foundWordInitialState;

  cleanFoundWord = () =>
    Promise.resolve(this.setState({
      foundWord: foundWordInitialState.foundWord,
    }));

  handleSetFoundWord = foundWord =>
    Promise.resolve(this.setState({
      foundWord: normalizeWord(foundWord)
    }));

  render() {
    const { foundWord } = this.state;

    return (
      <FoundWordContext.Provider
        value={{
          foundWord,
          setFoundWord: this.handleSetFoundWord,
          cleanFoundWord: this.cleanFoundWord,
        }}
      >{this.props.children}</FoundWordContext.Provider>
    );
  }
}

const withFoundWord = Cmp => props =>
  <FoundWordContext.Consumer>{value => <Cmp {...value} {...props} />}</FoundWordContext.Consumer>;

export { FoundWordProvider, withFoundWord, foundWordInitialState };
