import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components';
import routes from '../../routes';

const StyledNotFoundWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const PageNotFoundContainer = () => (
  <StyledNotFoundWrapper>
    <h1>Page not found</h1>
    <Button to={routes.root}>Home</Button>
  </StyledNotFoundWrapper>
);

export default PageNotFoundContainer;
