import React from 'react';
import PropTypes from 'prop-types';
import { LoadingNamesProvider } from './loading-names';
import { NotificationsProvider } from './notifications';
import { WordsProvider } from './words';
import { FoundWordProvider } from './found-word';
import { EditingWordProvider } from './editing-word';
import { WordsToLearnProvider } from './words-to-learn';


const StateProvider = ({ children }) => (
  <LoadingNamesProvider>
    <NotificationsProvider>
      <EditingWordProvider>
        <FoundWordProvider>
          <WordsProvider>
            <WordsToLearnProvider>
              {children}
            </WordsToLearnProvider>
          </WordsProvider>
        </FoundWordProvider>
      </EditingWordProvider>
    </NotificationsProvider>
  </LoadingNamesProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
