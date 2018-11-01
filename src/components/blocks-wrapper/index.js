import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const BlocksContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  @media (min-width: 480px) {
    width: 470px;
  };
  @media (min-width: 768px) {
    width: 750px;
  };
`;

const BlocksWrapper = ({ children }) => (
  <BlocksContainer>{children}</BlocksContainer>
);

BlocksWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default BlocksWrapper;
