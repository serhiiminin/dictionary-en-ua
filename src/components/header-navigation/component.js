import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/icons/List';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Rowing from '@material-ui/icons/Rowing';
import Search from '@material-ui/icons/Search';
import routes from '../../routes';
import { ButtonWithRouter } from '..';

const HeaderNavigation = ({ classes }) => (
  <div className={classes.headerNavigation}>
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
  </div>
);

HeaderNavigation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

HeaderNavigation.defaultProps = {
  classes: {},
};

export default HeaderNavigation;
