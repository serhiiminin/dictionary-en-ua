import React from "react";
import PropTypes from "prop-types";
import { LoadingNamesProvider } from "./loading-names";
import { NotificationsProvider } from "./notifications";
import { TokensProvider } from "./tokens";
import { WordsProvider } from "./words";
import { UserProvider } from "./user";

const StateProvider = ({ children }) => (
  <TokensProvider>
    <LoadingNamesProvider>
      <NotificationsProvider>
        <UserProvider>
          <WordsProvider>{children}</WordsProvider>
        </UserProvider>
      </NotificationsProvider>
    </LoadingNamesProvider>
  </TokensProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StateProvider;
