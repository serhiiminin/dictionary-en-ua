import React, { Component, createContext } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const FoundWordContext = createContext({});

const foundWordInitialState = {
  foundWord: {}
};

const normalizeWord = (result = {}) => {
  const { en = '', ru = '', transcription = '', results = [] } = result;
  const examples = results && results
    .reduce((res, val) =>
        val.examples
          ? [...res, ...val.examples.map(example => ({ example, id: uuid() }))]
          : [...res],
      []);

  return { en, ru, transcription, examples };
};

class FoundWordProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = foundWordInitialState;

  cleanFoundWord = () =>
    Promise.resolve(this.setState(prevState => ({
      ...prevState,
      foundWord: foundWordInitialState.foundWord,
    })));

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
