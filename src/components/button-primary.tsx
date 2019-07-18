import styled from 'styled-components';
import ButtonWithRouter from './button-with-router';
import { ThemeProps } from '../types';

const ButtonPrimary = styled(ButtonWithRouter)`
  && {
    font-size: 14px;
    color: ${(props: ThemeProps): string => props.theme.main.color.dark}
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
