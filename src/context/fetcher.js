import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withErrors } from './errors';
import { withLoadingNames } from './loading-names';

const FetcherContext = createContext({});

const FetcherProviderCmp = ({ children, handleError, startLoading, stopLoading }) => {
  const handleFetch = loadingName => apiHandler =>
    Promise.resolve(startLoading(loadingName))
      .then(apiHandler)
      .catch(handleError)
      .finally(() => stopLoading(loadingName));

  return (
    <FetcherContext.Provider
      value={{
        handleFetch,
      }}
    >
      {children}
    </FetcherContext.Provider>
  );
};

FetcherProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
  handleError: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

const FetcherProvider = compose(
  withErrors,
  withLoadingNames
)(FetcherProviderCmp);

const withFetcher = Cmp => props => (
  <FetcherContext.Consumer>{value => <Cmp {...value} {...props} />}</FetcherContext.Consumer>
);

export { FetcherProvider, withFetcher };
