import React from 'react';
import PropTypes from 'prop-types';
import { LoadingNamesProvider } from './loading-names';
import { WordsProvider } from './words';
import { UserProvider } from './user';
import { ErrorProvider } from './errors';
import { AuthProvider } from './auth';

const StateProvider = ({ children }) => (
  <ErrorProvider>
    <LoadingNamesProvider>
      <AuthProvider>
        <UserProvider>
          <WordsProvider>{children}</WordsProvider>
        </UserProvider>
      </AuthProvider>
    </LoadingNamesProvider>
  </ErrorProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
