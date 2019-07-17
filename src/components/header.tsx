import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonMenu from './button-menu';
import routes from '../routes';
import { withAuth, withLoading } from '../context/hocs';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ThemeProps } from '../types';

const HeaderWrapper = styled.div`
  margin-top: ${(props: ThemeProps): string => props.theme.main.space.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLink = styled(Link)`
  color: ${(props: ThemeProps): string => props.theme.palette.text.primary};
  text-decoration: none;
`;
const LogoSvg = styled(Logo)`
  width: 19rem;
  height: 4rem;
`;
const MenuDivider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${(props: ThemeProps): string => props.theme.main.space.sm};
`;

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
    <HeaderWrapper>
      <HeaderLink to={routes.root}>
        <LogoSvg />
      </HeaderLink>
      <MenuDivider>
        <ButtonMenu to={routes.words.list}>My words</ButtonMenu>
        <ButtonMenu variant="outlined" to={authButtonData.href}>
          {authButtonData.text}
        </ButtonMenu>
      </MenuDivider>
    </HeaderWrapper>
  );
};

export default compose(
  withLoading,
  withAuth
)(Header);
