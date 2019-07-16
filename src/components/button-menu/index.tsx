import styled from 'styled-components';
import ButtonWithRouter from '../button-with-router';
import { ThemeProps } from '../../types';

const ButtonMenu = styled(ButtonWithRouter)`
  && {
    min-width: 108px;
    min-height: 48px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    padding: 10px 25px;
    background: rgba(216, 216, 216, 0.0001);
    transition: all ${(props: ThemeProps): number => props.theme.main.transition.controls}ms ease-in-out;
    &:hover {
      border-color: ${(props: ThemeProps): string => props.theme.main.color.text};
      background: rgba(216, 216, 216, 0.0001);
    }
  }
`;

export default ButtonMenu;
