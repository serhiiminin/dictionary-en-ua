import React, { createContext, useContext } from 'react';
import { ErrorsContext } from './errors';
import { LoadingContext } from './loading';

interface Props {
  children: JSX.Element;
}

export interface FI {
  handleFetch: (ln: string) => H;
}

const FetcherContext = createContext({} as FI);

type R = Promise<object | void>;
type F = () => void;
type H = (handler: F) => R;

const FetcherProvider = ({ children }: Props): JSX.Element => {
  const { handleError } = useContext(ErrorsContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const handleFetch = (loadingName: string): H => (apiHandler: F): R =>
    Promise.resolve(startLoading(loadingName))
      .then(apiHandler)
      .catch(handleError)
      .finally((): void => stopLoading(loadingName));

  return <FetcherContext.Provider value={{ handleFetch }}>{children}</FetcherContext.Provider>;
};

export { FetcherProvider, FetcherContext };
