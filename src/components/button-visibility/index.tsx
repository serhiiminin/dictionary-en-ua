import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { ThemeProps } from '../../types';

const ButtonVisibility = styled((props: object): JSX.Element => <IconButton disableRipple {...props} />)`
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
