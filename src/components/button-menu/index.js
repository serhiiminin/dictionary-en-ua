import React from 'react';
import styled from 'styled-components';
import ButtonWithRouter from '../button';

const ButtonMenu = styled(props => <ButtonWithRouter disableRipple {...props} />)`
  && {
    min-width: 108px;
    min-height: 48px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    padding: 10px 25px;
    background: rgba(216, 216, 216, 0.0001);
    transition: all ${props => props.theme.main.transition.button}ms ease-in-out;
    &:hover {
      border-color: ${props => props.theme.main.colors.text};
      background: rgba(216, 216, 216, 0.0001);
    }
  }
`;

export default ButtonMenu;
