import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonMenu } from '..';
import { ReactComponent as Logo } from '../../images/logo.svg';
import routes from '../../routes';

const buttonsData = {
  signIn: {
    href: routes.auth.logIn,
    text: 'Sign in',
  },
  signOut: {
    href: routes.auth.logOut,
    text: 'Sign out',
  },
};

const Header = ({ isLoggedIn }) => {
  const authButtonData = isLoggedIn ? buttonsData.signOut : buttonsData.signIn;

  return (
    <div>
      <Link to={routes.root}>
        <Logo />
      </Link>
      <div>
        <ButtonMenu to={routes.words.list}>My words</ButtonMenu>
        <ButtonMenu variant="outlined" to={authButtonData.href}>
          {authButtonData.text}
        </ButtonMenu>
      </div>
    </div>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default Header;
