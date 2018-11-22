import React from "react";
import PropTypes from "prop-types";
import { LoadingNamesProvider } from "./loading-names";
import { NotificationsProvider } from "./notifications";
import { TokensProvider } from "./tokens";
import { WordsProvider } from "./words";
import { FoundWordProvider } from "./found-word";

const StateProvider = ({ children }) => (
  <TokensProvider>
    <LoadingNamesProvider>
      <NotificationsProvider>
        <FoundWordProvider>
          <WordsProvider>{children}</WordsProvider>
        </FoundWordProvider>
      </NotificationsProvider>
    </LoadingNamesProvider>
  </TokensProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StateProvider;
