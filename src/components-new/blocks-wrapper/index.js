import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBlockWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) : {
    max-width: 1140px;
  }
`;

const BlocksWrapper = ({ children }) => <StyledBlockWrapper>{children}</StyledBlockWrapper>;

BlocksWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlocksWrapper;
