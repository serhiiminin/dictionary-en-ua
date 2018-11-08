import React from 'react';
import List from '@material-ui/icons/List';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Rowing from '@material-ui/icons/Rowing';
import Search from '@material-ui/icons/Search';
import styled from 'styled-components';
import routes from '../../routes';
import { ButtonWithRouter } from '..';

export const NavigationWrapper = styled.div`
    display: grid;
    align-content: center;
    justify-content: end;
    grid-auto-flow: column;
    row-gap: 1rem;
    column-gap: .5rem;
`;

const HeaderNavigation = () => (
  <NavigationWrapper>
    <ButtonWithRouter
      to={routes.words.list.all}
      title='The list of my words'
    >
      <List />
    </ButtonWithRouter>
    <ButtonWithRouter
      to={routes.words.add}
      title='Add a new word'
    >
      <NoteAdd />
    </ButtonWithRouter>
    <ButtonWithRouter
      to={routes.words.search}
      title='Search a new word'
    >
      <Search />
    </ButtonWithRouter>
    <ButtonWithRouter
      to={routes.words.learn}
      title='Learn saved words'
    >
      <Rowing />
    </ButtonWithRouter>
  </NavigationWrapper>
);

export default HeaderNavigation;
