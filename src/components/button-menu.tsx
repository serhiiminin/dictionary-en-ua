import styled from 'styled-components';
import ButtonWithRouter from './button-with-router';
import { ThemeProps } from '../types';

const ButtonMenu = styled(ButtonWithRouter)`
  && {
    min-width: 10.8rem;
    min-height: 4.8rem;
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.85);
    padding: ${(props: ThemeProps): string => props.theme.main.space.md}
      ${(props: ThemeProps): string => props.theme.main.space.xl};
    background: ${(props: ThemeProps): string => props.theme.main.color.background};
    transition: all ${(props: ThemeProps): number => props.theme.main.transition.controls}ms ease-in-out;
    &:hover {
      border-color: ${(props: ThemeProps): string => props.theme.main.color.text};
      background: ${(props: ThemeProps): string => props.theme.main.color.background};
    }
  }
`;

export default ButtonMenu;
