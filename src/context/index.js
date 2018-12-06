import React from "react";
import PropTypes from "prop-types";
import { LoadingNamesProvider } from "./loading-names";
import { NotificationsProvider } from "./notifications";
import { WordsProvider } from "./words";
import { UserProvider } from "./user";

const StateProvider = ({ children }) => (
  <LoadingNamesProvider>
    <NotificationsProvider>
      <UserProvider>
        <WordsProvider>{children}</WordsProvider>
      </UserProvider>
    </NotificationsProvider>
  </LoadingNamesProvider>
);

StateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StateProvider;
