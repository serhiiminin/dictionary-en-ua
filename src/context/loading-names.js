import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const LoadingNamesContext = createContext({});

const LoadingNamesProvider = ({ children }) => {
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
    <LoadingNamesContext.Provider
      value={{
        checkIsLoading,
        startLoading: handleStartLoading,
        stopLoading: handleStopLoading,
      }}
    >
      {children}
    </LoadingNamesContext.Provider>
  );
};

LoadingNamesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const withLoadingNames = Cmp => props => (
  <LoadingNamesContext.Consumer>{value => <Cmp {...value} {...props} />}</LoadingNamesContext.Consumer>
);

export { LoadingNamesProvider, withLoadingNames };
