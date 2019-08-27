import React, { ComponentType, createContext } from 'react';
import { compose } from 'recompose';
import { withErrors, EI } from './errors';
import { withLoading, LI } from './loading';

interface OwnProps {
  children: JSX.Element;
}

type Props = EI & LI & OwnProps;

const { Provider, Consumer } = createContext({});

type R = Promise<object | void>;
type F = () => void;
type H = (handler: F) => R;

const FetcherProviderCmp = ({ children, handleError, startLoading, stopLoading }: Props): JSX.Element => {
  const handleFetch = (loadingName: string): H => (apiHandler: F): R =>
    Promise.resolve(startLoading(loadingName))
      .then(apiHandler)
      .catch(handleError)
      .finally((): void => stopLoading(loadingName));

  return <Provider value={{ handleFetch }}>{children}</Provider>;
};

const FetcherProvider = compose<Props, OwnProps>(
  withErrors,
  withLoading
)(FetcherProviderCmp);

export interface FI {
  handleFetch: (ln: string) => H;
}

const withFetcher = <T extends {}>(Cmp: ComponentType<T>): ((props: T & FI) => JSX.Element) => (
  props: T & FI
): JSX.Element => <Consumer>{(context: {}): JSX.Element => <Cmp {...context} {...props} />}</Consumer>;

export { FetcherProvider, withFetcher };
