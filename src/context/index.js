import React from "react";
import PropTypes from "prop-types";
import { LoadingNamesProvider } from "./loading-names";
import { NotificationsProvider } from "./notifications";
import { TokensProvider } from "./tokens";
import { WordsProvider } from "./words";
import { UserProvider } from "./user";

const StateProvider = ({ children }) => (
  <LoadingNamesProvider>
    <NotificationsProvider>
      <TokensProvider>
        <UserProvider>
          <WordsProvider>{children}</WordsProvider>
        </UserProvider>
      </TokensProvider>
    </NotificationsProvider>
  </LoadingNamesProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StateProvider;
