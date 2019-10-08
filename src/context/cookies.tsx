import React, { createContext } from 'react';
import Cookies from 'js-cookie';
import config from '../config';

export interface CI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFromCookies(key: string): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setToCookies(key: string, value: any, params?: object): void;
  removeFromCookies(key: string): void;
}

const cookiesMethods = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFromCookies: (key: string): any => JSON.parse(Cookies.get(key) || '{}'),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setToCookies: (key: string, value: any, params = {}): void => {
    const cookiesParams = {
      expires: 1,
      path: config.publicUrl,
      ...params,
    };
    Cookies.set(key, JSON.stringify(value), cookiesParams);
  },
  removeFromCookies: (key: string): void => {
    Cookies.remove(key);
  },
};

const CookiesContext = createContext<CI>(cookiesMethods);

interface Props {
  children: JSX.Element;
}

const CookiesProvider = ({ children }: Props): JSX.Element => (
  <CookiesContext.Provider value={{ ...cookiesMethods }}>{children}</CookiesContext.Provider>
);

export { CookiesProvider, CookiesContext };
