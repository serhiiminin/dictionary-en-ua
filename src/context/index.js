import React from 'react';
import PropTypes from 'prop-types';
import { LoadingNamesProvider } from './loading-names';
import { NotificationsProvider } from './notifications';
import { WordsProvider } from './words';
import { WordFormProvider } from './word-form';
import { FoundWordProvider } from './found-word';

const StateProvider = ({ children }) => (
  <LoadingNamesProvider>
    <NotificationsProvider>
      <FoundWordProvider>
        <WordsProvider>
          <WordFormProvider>
            {children}
          </WordFormProvider>
        </WordsProvider>
      </FoundWordProvider>
    </NotificationsProvider>
  </LoadingNamesProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
