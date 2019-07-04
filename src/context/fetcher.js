import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withErrors } from './errors';
import { withLoading } from './loading';

const { Provider, Consumer } = createContext({});

const FetcherProviderCmp = ({ children, handleError, startLoading, stopLoading }) => {
  const handleFetch = loadingName => apiHandler =>
    Promise.resolve(startLoading(loadingName))
      .then(apiHandler)
      .catch(handleError)
      .finally(() => stopLoading(loadingName));

  return <Provider value={{ handleFetch }}>{children}</Provider>;
};

FetcherProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
  handleError: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

const FetcherProvider = compose(
  withErrors,
  withLoading
)(FetcherProviderCmp);

const withFetcher = Cmp => props => <Consumer>{value => <Cmp {...value} {...props} />}</Consumer>;

export { FetcherProvider, withFetcher };
