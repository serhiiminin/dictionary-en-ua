import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HeaderNavigation } from '..';
import routes from '../../routes';

export const HeaderBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: ${props => props.theme.main.padding.medium} 0;
`;

export const StyledRouterLink = styled(Link)`
  color: ${props => props.theme.palette.text.primary};
  text-decoration: none;
  font-size: 1.5rem;
`;

const Header = () => (
  <HeaderBlock>
    <h1>
      <StyledRouterLink to={routes.root}>The dictionary</StyledRouterLink>
    </h1>
    <HeaderNavigation/>
  </HeaderBlock>
);

export default Header;
