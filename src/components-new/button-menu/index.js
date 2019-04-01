import React from 'react';
import styled from 'styled-components';
import { ButtonWithRouter } from '..';

const ButtonMenu = styled(props => <ButtonWithRouter {...props} />)`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  padding: 10px 45px;
  background: rgba(216, 216, 216, 0.0001);
  &:hover {
    background: rgba(216, 216, 216, 0.0001);
  }
`;

export default ButtonMenu;
