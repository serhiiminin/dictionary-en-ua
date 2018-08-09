import React from 'react';
import PropTypes from 'prop-types';
import { NotificationsProvider } from '../notifications';
import { WordsProvider } from '../words';
import { WordFormProvider } from '../word-form';

const StateProvider = ({ children }) => (
  <NotificationsProvider>
    <WordsProvider>
      <WordFormProvider>
        {children}
      </WordFormProvider>
    </WordsProvider>
  </NotificationsProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
