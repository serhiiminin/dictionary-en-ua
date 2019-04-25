import React from 'react';
import styled from 'styled-components';
import ButtonWithRouter from '../button-with-router';

const ButtonPrimary = styled(props => <ButtonWithRouter {...props} />)`
  && {
    font-size: 14px;
    color: ${props => props.theme.main.colors.dark}
    padding: 15px 45px;
    background: #fff;
    line-height: 26px;
    text-align: center;
    letter-spacing: 2px;
    &:hover {
      background: #fff;
    }
  }
`;

export default ButtonPrimary;
