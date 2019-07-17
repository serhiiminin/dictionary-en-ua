import React, { ComponentType, createContext, useState } from 'react';

interface Props {
  children: JSX.Element;
}

const { Provider, Consumer } = createContext({});

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

export interface LI {
  checkIsLoading(...names: string[]): boolean;
  startLoading(name: string): void;
  stopLoading(name: string): void;
}

const withLoading = <T extends {}>(Cmp: ComponentType<T>): ((props: T & LI) => JSX.Element) => (
  props: T & LI
): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Consumer>{(context: any): JSX.Element => <Cmp {...context} {...props} />}</Consumer>
);

export { LoadingProvider, withLoading };
