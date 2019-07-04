import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = createContext({});

const LoadingProvider = ({ children }) => {
  const [currentLoadingNames, setCurrentLoadingNames] = useState({});

  const handleStartLoading = name =>
    setCurrentLoadingNames(prevState => ({
      ...prevState,
      [name]: (prevState[name] || 0) + 1,
    }));

  const handleStopLoading = name =>
    setCurrentLoadingNames(prevState => ({
      ...prevState,
      [name]: (prevState[name] || 1) - 1,
    }));

  const checkIsLoading = (...loadingNamesToCheck) =>
    Object.entries(currentLoadingNames).some(
      loadingName => loadingNamesToCheck.includes(loadingName[0]) && loadingName[1] > 0
    );

  return (
    <Provider
      value={{
        checkIsLoading,
        startLoading: handleStartLoading,
        stopLoading: handleStopLoading,
      }}
    >
      {children}
    </Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const withLoading = Cmp => props => <Consumer>{value => <Cmp {...value} {...props} />}</Consumer>;

export { LoadingProvider, withLoading };
