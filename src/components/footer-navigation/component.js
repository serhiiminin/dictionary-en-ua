import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { List, Home, NoteAdd, Input, ExitToApp } from '@material-ui/icons';
import routes from '../../routes';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

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
    path: routes.words.add,
    icon: <NoteAdd />,
    placeholder: 'Add a word',
  },
  isUserLoggedIn
    ? {
        path: routes.auth.login,
        icon: <ExitToApp onClick={logOut} />,
        placeholder: 'Logout',
      }
    : {
        path: routes.auth.login,
        icon: <Input />,
        placeholder: 'Login',
      },
];

const FooterNavigation = ({
  isLoggedIn,
  handleLogout,
  classes,
  history,
  location,
}) => (
  <BottomNavigation
    classes={{ root: classes.bottomNavigation }}
    value={location.pathname}
    onChange={(_, value) => history.push(value)}
    className={classes.root}
  >
    {createLinks(isLoggedIn, handleLogout).map(
      ({ icon, path, placeholder }) => (
        <BottomNavigationAction
          key={path}
          value={path}
          icon={icon}
          label={placeholder}
          showLabel
        />
      )
    )}
  </BottomNavigation>
);

FooterNavigation.propTypes = {
  classes: composeClassesPropTypes(styles),
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

FooterNavigation.defaultProps = {
  isLoggedIn: false,
  classes: {},
};

export default FooterNavigation;
