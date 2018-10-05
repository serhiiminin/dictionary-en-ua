import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HeaderNavigation } from '..';
import stylesVariables from '../../constants/styles-variables';
import routes from '../../routes';

const HeaderBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: ${stylesVariables.padding.medium} 0;
`;

const StyledRouterLink = styled(Link)`
  color: ${stylesVariables.colors.text};
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
