import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import config from '../config';

const { Provider, Consumer } = createContext({});

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

  const removeFromCookies = key => {
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

CookiesProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
};

const CookiesProvider = compose(
  withRouter,
  withSnackbar
)(CookiesProviderCmp);

const withCookies = Cmp => props => <Consumer>{value => <Cmp {...value} {...props} />}</Consumer>;

export { CookiesProvider, withCookies };
