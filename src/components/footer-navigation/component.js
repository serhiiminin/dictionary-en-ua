import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import List from '@material-ui/icons/List';
import Home from '@material-ui/icons/Home';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Rowing from '@material-ui/icons/Rowing';
import Search from '@material-ui/icons/Search';
import Input from '@material-ui/icons/Input';
import ExitToApp from '@material-ui/icons/ExitToApp';
import routes from '../../routes';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const createLinks = isUserLoggedIn => [
  {
    path: routes.root,
    icon: <Home />,
    placeholder: 'Home',
  },
  {
    path: routes.words.list.all,
    icon: <List />,
    placeholder: 'My words',
  },
  {
    path: routes.words.add,
    icon: <NoteAdd />,
    placeholder: 'Add a word',
  },
  {
    path: routes.words.search,
    icon: <Search />,
    placeholder: 'Search a word',
  },
  {
    path: routes.words.learn,
    icon: <Rowing />,
    placeholder: 'Learn words',
  },
  isUserLoggedIn
    ? {
        path: routes.logout,
        icon: <ExitToApp />,
        placeholder: 'Logout',
      }
    : {
        path: routes.login,
        icon: <Input />,
        placeholder: 'Login',
      },
];

const HeaderNavigation = ({ isUserLoggedIn, classes, history, location }) => (
  <BottomNavigation
    classes={{ root: classes.bottomNavigation }}
    value={location.pathname}
    onChange={(_, value) => history.push(value)}
    className={classes.root}
  >
    {createLinks(isUserLoggedIn).map(({ icon, path, placeholder }) => (
      <BottomNavigationAction
        key={path}
        value={path}
        icon={icon}
        label={placeholder}
        showLabel
      />
    ))}
  </BottomNavigation>
);

HeaderNavigation.propTypes = {
  classes: composeClassesPropTypes(styles),
  isUserLoggedIn: PropTypes.bool,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

HeaderNavigation.defaultProps = {
  isUserLoggedIn: false,
  classes: {},
};

export default HeaderNavigation;
