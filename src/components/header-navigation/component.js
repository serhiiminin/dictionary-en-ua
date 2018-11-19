import React from "react";
import PropTypes from 'prop-types';
import List from "@material-ui/icons/List";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Rowing from "@material-ui/icons/Rowing";
import Search from "@material-ui/icons/Search";
import Input from "@material-ui/icons/Input";
import ExitToApp from "@material-ui/icons/ExitToApp";
import styled from "styled-components";
import routes from "../../routes";
import { ButtonWithRouter } from "..";

export const NavigationWrapper = styled.div`
  display: grid;
  align-content: center;
  justify-content: end;
  grid-auto-flow: column;
  row-gap: 1rem;
  column-gap: 0.5rem;
`;

const HeaderNavigation = ({ isUserLoggedIn }) => (
  <NavigationWrapper>
    <ButtonWithRouter to={routes.words.list.all} title="The list of my words">
      <List />
    </ButtonWithRouter>
    <ButtonWithRouter to={routes.words.add} title="Add a new word">
      <NoteAdd />
    </ButtonWithRouter>
    <ButtonWithRouter to={routes.words.search} title="Search a new word">
      <Search />
    </ButtonWithRouter>
    <ButtonWithRouter to={routes.words.learn} title="Learn saved words">
      <Rowing />
    </ButtonWithRouter>
    {isUserLoggedIn ? (
      <ButtonWithRouter to={routes.logout} title="Logout">
        <ExitToApp />
      </ButtonWithRouter>
    ) : (
      <ButtonWithRouter to={routes.login} title="Login">
        <Input />
      </ButtonWithRouter>
    )}
  </NavigationWrapper>
);

HeaderNavigation.propTypes = {
  isUserLoggedIn: PropTypes.bool,
}

HeaderNavigation.defaultProps = {
  isUserLoggedIn: false,
}

export default HeaderNavigation;
