import React from 'react';
import styled from 'styled-components';
import { ButtonWithRouter } from '..';

const StyledButtonMenu = styled(ButtonWithRouter)`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  padding: 10px 45px;
  background: rgba(216, 216, 216, 0.0001);
  &:hover: {
    background: rgba(216, 216, 216, 0.0001);
  }
`;

const ButtonMenu = props => <StyledButtonMenu {...props} />;

export default ButtonMenu;
