import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const LoadingNamesContext = createContext({});

const loadingNamesInitialState = {
  currentLoadingNames: [],
};

class LoadingNamesProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = loadingNamesInitialState;

  handleStartLoading = name =>
    this.setState(prevState => ({
      currentLoadingNames: [...prevState.currentLoadingNames, name]
    }));

  handleStopLoading = name =>
    this.setState(prevState => ({
      currentLoadingNames: [...prevState.currentLoadingNames].filter(loadingName => loadingName !== name)
    }));

  checkIsLoading = (currentLoadingNames = []) => (...loadingNamesToCheck) =>
    currentLoadingNames
      .some(currentLoadingName =>
        loadingNamesToCheck.includes(currentLoadingName)
      );

  render() {
    const { currentLoadingNames } = this.state;
    const { children } = this.props;
    const checkIsLoading = this.checkIsLoading(currentLoadingNames);

    return (
      <LoadingNamesContext.Provider
        value={{
          currentLoadingNames,
          checkIsLoading,
          startLoading: this.handleStartLoading,
          stopLoading: this.handleStopLoading,
        }}
      >{children}</LoadingNamesContext.Provider>
    );
  }
}

const withLoadingNames = Cmp => props =>
  <LoadingNamesContext.Consumer>{value => <Cmp {...value} {...props} />}</LoadingNamesContext.Consumer>;

export { LoadingNamesProvider, withLoadingNames };
