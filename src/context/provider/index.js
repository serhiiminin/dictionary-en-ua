import React from 'react';
import PropTypes from 'prop-types';
import { LoadingNamesProvider } from '../loading-names';
import { NotificationsProvider } from '../notifications';
import { WordsProvider } from '../words';
import { WordFormProvider } from '../word-form';
import { FoundWordProvider } from '../foundWord';

const StateProvider = ({ children }) => (
  <LoadingNamesProvider>
    <NotificationsProvider>
      <WordsProvider>
        <FoundWordProvider>
          <WordFormProvider>
            {children}
          </WordFormProvider>
        </FoundWordProvider>
      </WordsProvider>
    </NotificationsProvider>
  </LoadingNamesProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
