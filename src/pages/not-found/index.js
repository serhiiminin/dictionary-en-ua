import React from "react";
import styled from "styled-components";
import { ButtonWithRouter } from "../../components";
import routes from "../../routes";

const NotFoundWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const PageNotFoundContainer = () => (
  <NotFoundWrapper>
    <h1>Page not found</h1>
    <ButtonWithRouter to={routes.root}>Home</ButtonWithRouter>
  </NotFoundWrapper>
);

export default PageNotFoundContainer;
