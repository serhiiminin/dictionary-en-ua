import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const LoadingNamesContext = createContext({});

const initialState = {
  loadingNames: [],
};

class LoadingNamesProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  handleStartLoading = name =>
    this.setState(prevState => ({
      loadingNames: [...prevState.loadingNames, name]
    }));

  handleStopLoading = name =>
    this.setState(prevState => ({
      loadingNames: [...prevState.loadingNames].filter(loadingName => loadingName !== name)
    }));

  render() {
    const { loadingNames } = this.state;

    return (
      <LoadingNamesContext.Provider
        value={{
          loadingNames,
          startLoading: this.handleStartLoading,
          stopLoading: this.handleStopLoading,
        }}
      >{this.props.children}</LoadingNamesContext.Provider>
    );
  }
}

const withLoadingNames = Cmp => props =>
  <LoadingNamesContext.Consumer>{value => <Cmp {...value} {...props} />}</LoadingNamesContext.Consumer>;

export { LoadingNamesProvider, withLoadingNames };
