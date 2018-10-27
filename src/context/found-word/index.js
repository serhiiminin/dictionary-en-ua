import React, { Component, createContext } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const FoundWordContext = createContext({});

const mergeArrays = (data, field) =>
  Array.from(
    new Set(
      data.reduce(
        (res, val) => val[field] ? [...res, ...val[field]] : [...res],
        []
      )
    )
  );

const addIdForArrayItems = items => items.map(item => ({ value: item, id: uuid() }));

const normalizeWord = (wordData = {}) => {
  const { en, ua, transcription, results = [], ...rest } = wordData;

  const partOfSpeech = addIdForArrayItems(Array.from(new Set(results.map(item => item.partOfSpeech))));
  const examples = addIdForArrayItems(mergeArrays(results, 'examples'));
  const definitions = addIdForArrayItems(results.map(item => item.definition));
  const synonyms = addIdForArrayItems(mergeArrays(results, 'synonyms'));
  const antonyms = addIdForArrayItems(mergeArrays(results, 'antonyms'));
  const similarTo = addIdForArrayItems(mergeArrays(results, 'similarTo'));

  return { en, ua, transcription, examples, definitions, similarTo, synonyms, antonyms, partOfSpeech, ...rest };
};

class FoundWordProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    foundWord: {}
  };

  cleanFoundWord = () =>
    Promise.resolve(this.setState({
      foundWord: {},
    }));

  handleSetFoundWord = foundWord =>
    Promise.resolve(this.setState({
      foundWord: normalizeWord(foundWord)
    }));

  render() {
    const { foundWord } = this.state;
    const { children } = this.props;

    return (
      <FoundWordContext.Provider
        value={{
          foundWord,
          setFoundWord: this.handleSetFoundWord,
          cleanFoundWord: this.cleanFoundWord,
        }}
      >{children}</FoundWordContext.Provider>
    );
  }
}

const withFoundWord = Cmp => props =>
  <FoundWordContext.Consumer>{value => <Cmp {...value} {...props} />}</FoundWordContext.Consumer>;

export { FoundWordProvider, withFoundWord };
