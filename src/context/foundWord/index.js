import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const FoundWordContext = createContext({});

const initialState = {
  foundWord: {}
};

const normalizeWord = (result = {}) => {
  const { en = '', ru = '', transcription = '', results = [] } = result;
  const examples = results && results
    .reduce((res, val) =>
        val.examples
          ? [...res, ...val.examples.map(example => ({ example }))]
          : [...res],
      []);

  return { en, ru, transcription, examples }
};

class FoundWordProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  cleanFoundWord = () =>
    Promise.resolve(this.setState(prevState => ({
      ...prevState,
      foundWord: initialState.foundWord,
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

export { FoundWordProvider, withFoundWord };
