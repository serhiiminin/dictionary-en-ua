import React from 'react';
import PropTypes from 'prop-types';
import { LoadingProvider } from './loading';
import { CookiesProvider } from './cookies';
import { DimensionsProvider } from './dimensions';
import { FetcherProvider } from './fetcher';
import { ErrorProvider } from './errors';
import { WordsProvider } from './words';
import { UserProvider } from './user';
import { AuthProvider } from './auth';

const StateProvider = ({ children }) => (
  <CookiesProvider>
    <ErrorProvider>
      <DimensionsProvider>
        <LoadingProvider>
          <FetcherProvider>
            <AuthProvider>
              <UserProvider>
                <WordsProvider>{children}</WordsProvider>
              </UserProvider>
            </AuthProvider>
          </FetcherProvider>
        </LoadingProvider>
      </DimensionsProvider>
    </ErrorProvider>
  </CookiesProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
