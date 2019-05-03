import React from 'react';
import { Fab } from '@material-ui/core';
import styled from 'styled-components';
import Button from '../button';

const ButtonSocial = styled(props => <Button {...props} component={Fab} />)`
  && {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    padding: 15px 45px;
    background: rgba(216, 216, 216, 0.0001);
    &:hover {
      background: rgba(216, 216, 216, 0.0001);
    }
  }
`;

export default ButtonSocial;
