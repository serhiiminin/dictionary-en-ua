import React, { ComponentType, createContext } from 'react';
import Cookies from 'js-cookie';
import config from '../config';

const { Provider, Consumer } = createContext({});

interface Props {
  children: JSX.Element;
}

const CookiesProvider = ({ children }: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFromCookies = (key: string): any => JSON.parse(Cookies.get(key) || '');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setToCookies = (key: string, value: any, params = {}): void => {
    const cookiesParams = {
      expires: 1,
      path: config.publicUrl,
      ...params,
    };
    Cookies.set(key, JSON.stringify(value), cookiesParams);
  };

  const removeFromCookies = (key: string): void => {
    Cookies.remove(key);
  };

  return (
    <Provider
      value={{
        getFromCookies,
        setToCookies,
        removeFromCookies,
      }}
    >
      {children}
    </Provider>
  );
};

export interface CI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFromCookies(key: string): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setToCookies(key: string, value: any, params?: object): void;
  removeFromCookies(key: string): void;
}

const withCookies = <T extends {}>(Cmp: ComponentType<T>): ((props: T & CI) => JSX.Element) => (
  props: T & CI
): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Consumer>{(context: any): JSX.Element => <Cmp {...context} {...props} />}</Consumer>
);
export { CookiesProvider, withCookies };
