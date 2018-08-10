import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const FoundWordContext = createContext({});

const initialState = {
  foundWord: {}
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

  handleSetFoundWord = params =>
    Promise.resolve(this.setState({
      foundWord: { ...params }
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
