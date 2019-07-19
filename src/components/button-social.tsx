import React from 'react';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import ButtonWithRouter from './button-with-router';

const ButtonSocial = styled((props): JSX.Element => <ButtonWithRouter {...props} component={Fab} />)`
  && {
    background: #ffffff;
    box-shadow: 9px 9px 18px rgba(123, 123, 123, 0.1);
    &:hover {
      background: #ffffff;
    }
  }
`;

export default ButtonSocial;
