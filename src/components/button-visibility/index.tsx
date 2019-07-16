import React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { ThemeProps } from '../../types';

const ButtonVisibility = styled((props: IconButtonProps): JSX.Element => <IconButton {...props} />)`
  && {
    font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.lg};
    background: transparent;
    margin: 0;
    padding: 0;
    &:hover {
      background: transparent;
    }
  }
`;

export default ButtonVisibility;
