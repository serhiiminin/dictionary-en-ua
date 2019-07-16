import React from 'react';
import { compose } from 'recompose';
import ButtonMenu from '../button-menu';
import SC from './styles';
import routes from '../../routes';
import { withLoading } from '../../context/loading';
import { withAuth } from '../../context/auth';

const buttonsData = {
  signIn: {
    href: routes.auth.logIn,
    text: 'Log in',
  },
  signOut: {
    href: routes.auth.logOut,
    text: 'Log out',
  },
};

interface Props {
  isLoggedIn?: boolean;
  children?: React.ReactNode;
}

const Header = ({ isLoggedIn }: Props): JSX.Element => {
  const authButtonData = isLoggedIn ? buttonsData.signOut : buttonsData.signIn;

  return (
    <SC.Header>
      <SC.HeaderLink to={routes.root}>
        <SC.LogoSvg />
      </SC.HeaderLink>
      <SC.MenuDivider>
        <ButtonMenu to={routes.words.list}>My words</ButtonMenu>
        <ButtonMenu variant="outlined" to={authButtonData.href}>
          {authButtonData.text}
        </ButtonMenu>
      </SC.MenuDivider>
    </SC.Header>
  );
};

export default compose(
  withLoading,
  withAuth
)(Header);
