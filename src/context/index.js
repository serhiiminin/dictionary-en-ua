import React from 'react';
import PropTypes from 'prop-types';
import { LoadingNamesProvider } from './loading-names';
import { WordsProvider } from './words';
import { UserProvider } from './user';
import { ErrorProvider } from './errors';

const StateProvider = ({ children }) => (
  <ErrorProvider>
    <LoadingNamesProvider>
      <UserProvider>
        <WordsProvider>{children}</WordsProvider>
      </UserProvider>
    </LoadingNamesProvider>
  </ErrorProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
