import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonMenu } from '..';
import styled from 'styled-components';
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

const StyledHeader = styled.div` {
  padding: ${props => props.theme.main.padding.large} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledHeaderLink = styled(Link)`
  color: theme.palette.text.primary;
  text-decoration: none;
  font-size: 1.6rem;
`;
const StyledLogo = styled(Logo)`
  width: 250px;
  height: 55px;
`;
const StyledMenuDivider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 5px;
`;

const Header = ({ isLoggedIn }) => {
  const authButtonData = isLoggedIn ? buttonsData.signOut : buttonsData.signIn;

  return (
    <StyledHeader>
      <StyledHeaderLink to={routes.root}>
        <StyledLogo />
      </StyledHeaderLink>
      <StyledMenuDivider>
        <ButtonMenu to={routes.words.list}>My words</ButtonMenu>
        <ButtonMenu variant="outlined" to={authButtonData.href}>
          {authButtonData.text}
        </ButtonMenu>
      </StyledMenuDivider>
    </StyledHeader>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default Header;
