import React from 'react';
import List from '@material-ui/icons/List';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Rowing from '@material-ui/icons/Rowing';
import Search from '@material-ui/icons/Search';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';
import routes from '../../routes';
import { ButtonWithRouter } from '..';

const HeaderNavigation = ({ classes }) => (
  <div className={classes.headerNavigation}>
    <ButtonWithRouter
      to={routes.words.list}
      title='The list of my words'
      variant="fab"
      mini
    >
      <List />
    </ButtonWithRouter>
    <ButtonWithRouter
      to={routes.words.add}
      title='Add a new word'
      variant="fab"
      mini
    >
      <NoteAdd />
    </ButtonWithRouter>
    <ButtonWithRouter
      to={routes.words.search}
      title='Search a new word'
      variant="fab"
      mini
    >
      <Search />
    </ButtonWithRouter>
    <ButtonWithRouter
      to={routes.words.learn}
      title='Learn saved words'
      variant="fab"
      mini
    >
      <Rowing />
    </ButtonWithRouter>
  </div>
);

HeaderNavigation.propTypes = {
  classes: classesShape,
};

HeaderNavigation.defaultProps = {
  classes: classesDefaultProps,
};

export default HeaderNavigation;
