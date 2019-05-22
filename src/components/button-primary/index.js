import React from 'react';
import styled from 'styled-components';
import ButtonWithRouter from '../button';

const ButtonPrimary = styled(props => <ButtonWithRouter {...props} />)`
  && {
    font-size: 14px;
    color: ${props => props.theme.main.color.dark}
    box-shadow: 9px 9px 15px rgba(15, 99, 203, 0.179551);
    padding: 15px 45px;
    background: #fff;
    line-height: 26px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
    &:hover {
      background: #fff;
    }
  }
`;

export default ButtonPrimary;
