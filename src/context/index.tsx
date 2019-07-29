import React from 'react';
import { LoadingProvider } from './loading';
import { CookiesProvider } from './cookies';
import { DimensionsProvider } from './dimensions';
import { FetcherProvider } from './fetcher';
import { ErrorProvider } from './errors';
import { WordsProvider } from './words';
import { UserProvider } from './user';
import { AuthProvider } from './auth';
import { SearchParamsProvider } from './search-params';

interface Props {
  children: JSX.Element;
}

const StateProvider = ({ children }: Props): JSX.Element => (
  <CookiesProvider>
    <ErrorProvider>
      <SearchParamsProvider>
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
      </SearchParamsProvider>
    </ErrorProvider>
  </CookiesProvider>
);

export default StateProvider;
