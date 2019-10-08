import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonMenu from './button-menu';
import routes from '../routes';
import { AuthContext } from '../context/auth';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ThemeProps } from '../types';
import Container from './container';

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

interface OwnProps {
  children?: React.ReactNode;
}

const Header = (): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);
  const authButtonData = isLoggedIn ? buttonsData.signOut : buttonsData.signIn;

  return (
    <Container>
      <HeaderWrapper>
        <HeaderLink to={routes.root}>
          <LogoSvg />
        </HeaderLink>
        <MenuDivider>
          <ButtonMenu to={routes.words.list}>My words</ButtonMenu>
          <ButtonMenu to={authButtonData.href} variant="outlined">
            {authButtonData.text}
          </ButtonMenu>
        </MenuDivider>
      </HeaderWrapper>
    </Container>
  );
};

export default Header;
