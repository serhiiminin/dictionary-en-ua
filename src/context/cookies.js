import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import config from '../config';
import { withFetcher } from './fetcher';

const CookiesContext = createContext({});

const CookiesProviderCmp = ({ children }) => {
  const getFromCookies = key => JSON.parse(Cookies.get(key) || null);

  const setToCookies = (key, value, params = {}) => {
    const cookiesParams = {
      expires: 1,
      path: config.publicUrl,
      ...params,
    };
    Cookies.set(key, JSON.stringify(value), cookiesParams);
  };

  const removeFromCookies = key => JSON.parse(Cookies.remove(key) || null);

  return (
    <CookiesContext.Provider
      value={{
        getFromCookies,
        setToCookies,
        removeFromCookies,
      }}
    >
      {children}
    </CookiesContext.Provider>
  );
};

CookiesProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
};

const CookiesProvider = compose(
  withRouter,
  withFetcher,
  withSnackbar
)(CookiesProviderCmp);

const withCookies = Cmp => props => (
  <CookiesContext.Consumer>{value => <Cmp {...value} {...props} />}</CookiesContext.Consumer>
);

export { CookiesProvider, withCookies };
