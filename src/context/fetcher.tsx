import React, { createContext, useContext } from 'react';
import { ErrorsContext, EI } from './errors';
import { LI, LoadingContext } from './loading';

interface OwnProps {
  children: JSX.Element;
}

export interface FI {
  handleFetch: (ln: string) => H;
}

const FetcherContext = createContext({} as FI);

type Props = EI & LI & OwnProps;

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
