import React from 'react';
import styled from 'styled-components';
import ButtonWithRouter from './button-with-router';
import { ThemeProps } from '../types';

const ButtonLink = styled((props): JSX.Element => <ButtonWithRouter {...props} />)`
  && {
    font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
    font-family: ${(props: ThemeProps): string => props.theme.main.fontFamily.cairoRegular};
    color: ${(props: ThemeProps): string => props.theme.main.color.text};
    background: ${(props: ThemeProps): string => props.theme.main.color.background};
    box-shadow: 6px 6px 18px rgba(123, 123, 123, 0.14);
    border-radius: 5rem;
    width: 13.5rem;
    height: 5rem;
    line-height: 26px;
    text-align: center;
    letter-spacing: 2px;
    &:hover {
      opacity: 1;
      background: ${(props: ThemeProps): string => props.theme.main.color.background};
    }
  }
`;

export default ButtonLink;
