import React, { createContext, useState } from 'react';

export interface LI {
  checkIsLoading(...names: string[]): boolean;
  startLoading(name: string): void;
  stopLoading(name: string): void;
}

const LoadingContext = createContext({} as LI);

interface Props {
  children: JSX.Element;
}

interface State {
  [propName: string]: number;
}
const LoadingProvider = ({ children }: Props): JSX.Element => {
  const [currentLoadingNames, setCurrentLoadingNames] = useState<State>({});

  const handleStartLoading = (name: string): void =>
    setCurrentLoadingNames(
      (prevState): State => ({
        ...prevState,
        [name]: (prevState[name] || 0) + 1,
      })
    );

  const handleStopLoading = (name: string): void =>
    setCurrentLoadingNames(
      (prevState): State => ({
        ...prevState,
        [name]: (prevState[name] || 1) - 1,
      })
    );

  const checkIsLoading = (...loadingNamesToCheck: string[]): boolean =>
    Object.entries(currentLoadingNames).some(
      (loadingName): boolean => loadingNamesToCheck.includes(loadingName[0]) && loadingName[1] > 0
    );

  return (
    <LoadingContext.Provider
      value={{
        checkIsLoading,
        startLoading: handleStartLoading,
        stopLoading: handleStopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext };
