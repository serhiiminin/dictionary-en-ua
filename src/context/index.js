import React from 'react';
import PropTypes from 'prop-types';
import { LoadingNamesProvider } from './loading-names/index';
import { NotificationsProvider } from './notifications/index';
import { WordsProvider } from './words/index';
import { WordFormProvider } from './word-form/index';
import { FoundWordProvider } from './foundWord/index';

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
