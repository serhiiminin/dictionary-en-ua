import React from 'react';
import PropTypes from 'prop-types';
import { LoadingNamesProvider } from './loading-names';
import { CookiesProvider } from './cookies';
import { FetcherProvider } from './fetcher';
import { ErrorProvider } from './errors';
import { WordsProvider } from './words';
import { UserProvider } from './user';
import { AuthProvider } from './auth';

const StateProvider = ({ children }) => (
  <CookiesProvider>
    <ErrorProvider>
      <LoadingNamesProvider>
        <FetcherProvider>
          <AuthProvider>
            <UserProvider>
              <WordsProvider>{children}</WordsProvider>
            </UserProvider>
          </AuthProvider>
        </FetcherProvider>
      </LoadingNamesProvider>
    </ErrorProvider>
  </CookiesProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
