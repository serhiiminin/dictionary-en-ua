import React from "react";
import PropTypes from "prop-types";
import { LoadingNamesProvider } from "./loading-names";
import { NotificationsProvider } from "./notifications";
import { TokensProvider } from "./tokens";
import { WordsProvider } from "./words";

const StateProvider = ({ children }) => (
  <TokensProvider>
    <LoadingNamesProvider>
      <NotificationsProvider>
          <WordsProvider>{children}</WordsProvider>
      </NotificationsProvider>
    </LoadingNamesProvider>
  </TokensProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StateProvider;
