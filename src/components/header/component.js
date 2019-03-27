import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonMenu } from '..';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import { ReactComponent as Logo } from '../../images/logo.svg';
import routes from '../../routes';
import styles from './styles';

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

const Header = ({ classes, isLoggedIn }) => {
  const authButtonData = isLoggedIn ? buttonsData.signOut : buttonsData.signIn;

  return (
    <div className={classes.header}>
      <Link to={routes.root} className={classes.headerLink}>
        <Logo className={classes.logo} />
      </Link>
      <div className={classes.menuDivider}>
        <ButtonMenu to={routes.words.list}>My words</ButtonMenu>
        <ButtonMenu variant="outlined" to={authButtonData.href}>
          {authButtonData.text}
        </ButtonMenu>
      </div>
    </div>
  );
};

Header.propTypes = {
  classes: composeClassesPropTypes(styles),
  isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  classes: {},
  isLoggedIn: false,
};

export default Header;
