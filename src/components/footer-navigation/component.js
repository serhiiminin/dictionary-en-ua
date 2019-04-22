import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { List, Home, NoteAdd, Input, ExitToApp, Search } from '@material-ui/icons';
import routes from '../../routes';

const createLinks = (isUserLoggedIn, logOut) => [
  {
    path: routes.root,
    icon: <Home />,
    placeholder: 'Home',
  },
  {
    path: routes.words.list,
    icon: <List />,
    placeholder: 'My words',
  },
  {
    path: routes.words.search,
    icon: <Search />,
    placeholder: 'Search a word',
  },
  {
    path: routes.words.add,
    icon: <NoteAdd />,
    placeholder: 'Add a word',
  },
  isUserLoggedIn
    ? {
        path: routes.auth.logIn,
        icon: <ExitToApp onClick={logOut} />,
        placeholder: 'Logout',
      }
    : {
        path: routes.auth.logIn,
        icon: <Input />,
        placeholder: 'Login',
      },
];

const FooterNavigation = ({ isLoggedIn, handleLogout, history, location }) => (
  <BottomNavigation value={location.pathname} onChange={(_, value) => history.push(value)}>
    {createLinks(isLoggedIn, handleLogout).map(({ icon, path, placeholder }) => (
      <BottomNavigationAction key={path} value={path} icon={icon} label={placeholder} showLabel />
    ))}
  </BottomNavigation>
);

FooterNavigation.propTypes = {
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

FooterNavigation.defaultProps = {
  isLoggedIn: false,
};

export default FooterNavigation;
